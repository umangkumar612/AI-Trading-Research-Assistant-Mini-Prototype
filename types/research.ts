export type HoldingUnit = "trading_days" | "weeks" | "months" | null;
export type MissingInfo = { field: string; question: string; reason: string };
export type Experiment = {
  question: string; instrument: string | null; timeframe: string | null;
  entryCondition: string | null; exitCondition: string | null; holdingPeriod: number | null;
  holdingPeriodUnit: HoldingUnit; filters: string[]; hypothesis: string | null;
  missingInformation: MissingInfo[]; needsClarification: boolean;
};
export type Trade = { date: string; entry: number; exit: number; returnPct: number };
export type TestResult = { status: "success"; dataSource: "simulated"; metrics: { totalTrades: number; winningTrades: number; losingTrades: number; winRate: number; averageReturn: number; medianReturn: number; bestTrade: number; worstTrade: number; strategyReturn: number; benchmarkReturn: number }; trades: Trade[]; chart: { label: string; strategy: number; benchmark: number }[] };
