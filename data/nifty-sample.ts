export type Bar = { date: string; open: number; high: number; low: number; close: number };

export const niftySample: Bar[] = Array.from({ length: 120 }, (_, index) => {
  const base = 23500 + Math.sin(index / 5) * 420 + index * 2;
  const shock = index % 11 === 0 ? -base * 0.014 : index % 17 === 0 ? -base * 0.023 : 0;
  const open = Math.round(base + shock);
  const close = Math.round(open + Math.sin(index * 1.7) * 180 + (index % 7) * 12);
  return { date: `2025-${String(Math.floor(index / 28) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`, open, high: Math.max(open, close) + 95, low: Math.min(open, close) - 105, close };
});
