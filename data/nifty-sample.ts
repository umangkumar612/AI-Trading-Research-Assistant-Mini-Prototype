export type Bar = { date: string; open: number; high: number; low: number; close: number };

let previousClose = 23500;
export const niftySample: Bar[] = Array.from({ length: 180 }, (_, index) => {
  const priorClose = previousClose;
  const dailyMove = [0.006, -0.004, 0.008, -0.014, 0.003, -0.019, 0.011, -0.006, 0.004][index % 9];
  const open = Math.round(priorClose * (1 + (index % 13 === 0 ? 0.004 : -0.001)));
  const close = Math.round(open * (1 + dailyMove));
  const range = index % 4 === 0 || index % 9 === 3 || index % 9 === 5 ? 0.026 : 0.012;
  previousClose = close;
  return { date: `2025-${String(Math.floor(index / 30) + 1).padStart(2, "0")}-${String((index % 30) + 1).padStart(2, "0")}`, open, high: Math.round(Math.max(open, close) * (1 + range / 2)), low: Math.round(Math.min(open, close) * (1 - range / 2)), close };
});
