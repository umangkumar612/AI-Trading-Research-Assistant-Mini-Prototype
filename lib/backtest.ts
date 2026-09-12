import { niftySample } from "@/data/nifty-sample";
import type { Experiment, TestResult, Trade } from "@/types/research";

export function runBacktest(experiment: Experiment): TestResult {
  const threshold = Number(experiment.entryCondition?.match(/(\d+(?:\.\d+)?)%/)?.[1] ?? 1);
  const hold = experiment.holdingPeriod ?? 5;
  const trades: Trade[] = [];
  for (let index = 1; index + hold < niftySample.length; index += 1) {
    const previous = niftySample[index - 1];
    const decline = ((previous.close - previous.open) / previous.open) * 100;
    if (decline > -threshold) continue;
    const volatility = ((previous.high - previous.low) / previous.open) * 100;
    if (experiment.filters.some((filter) => filter.toLowerCase().includes("volatility")) && volatility < 2) continue;
    const entryBar = niftySample[index];
    const exitBar = niftySample[index + hold];
    trades.push({ date: entryBar.date, entry: entryBar.open, exit: exitBar.close, returnPct: Number(((exitBar.close / entryBar.open - 1) * 100).toFixed(2)) });
  }
  const returns = trades.map((trade) => trade.returnPct).sort((a, b) => a - b);
  const wins = returns.filter((value) => value > 0).length;
  const average = returns.length ? returns.reduce((sum, value) => sum + value, 0) / returns.length : 0;
  const median = returns.length ? returns[Math.floor(returns.length / 2)] : 0;
  const strategyReturn = trades.reduce((total, trade) => total * (1 + trade.returnPct / 100), 1) - 1;
  const benchmarkReturn = niftySample.length ? niftySample.at(-1)!.close / niftySample[0].open - 1 : 0;
  let cumulativeStrategy = 1;
  const chart = trades.map((trade, index) => {
    cumulativeStrategy *= 1 + trade.returnPct / 100;
    const benchmarkBar = niftySample.find((bar) => bar.date === trade.date) ?? niftySample[0];
    return { label: `Trade ${index + 1}`, strategy: Number(((cumulativeStrategy - 1) * 100).toFixed(2)), benchmark: Number(((benchmarkBar.close / niftySample[0].open - 1) * 100).toFixed(2)) };
  });
  return { status: "success", dataSource: "simulated", metrics: { totalTrades: trades.length, winningTrades: wins, losingTrades: trades.length - wins, winRate: Number((trades.length ? wins / trades.length * 100 : 0).toFixed(1)), averageReturn: Number(average.toFixed(2)), medianReturn: Number(median.toFixed(2)), bestTrade: Number((returns.at(-1) ?? 0).toFixed(2)), worstTrade: Number((returns[0] ?? 0).toFixed(2)), strategyReturn: Number((strategyReturn * 100).toFixed(2)), benchmarkReturn: Number((benchmarkReturn * 100).toFixed(2)) }, trades, chart };
}
