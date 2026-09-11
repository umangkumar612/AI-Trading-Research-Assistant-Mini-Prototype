import { z } from "zod";

export const experimentSchema = z.object({
  question: z.string(), instrument: z.string().nullable(), timeframe: z.string().nullable(),
  entryCondition: z.string().nullable(), exitCondition: z.string().nullable(), holdingPeriod: z.number().nullable(),
  holdingPeriodUnit: z.enum(["trading_days", "weeks", "months"]).nullable(), filters: z.array(z.string()),
  hypothesis: z.string().nullable(), missingInformation: z.array(z.object({ field: z.string(), question: z.string(), reason: z.string() })),
  needsClarification: z.boolean(),
});

export function analyzeLocally(question: string) {
  const lower = question.toLowerCase();
  const instrument = /nifty|nse/.test(lower) ? "NIFTY" : null;
  const percent = lower.match(/(\d+(?:\.\d+)?)\s*%/);
  const fall = percent ? `NIFTY falls by at least ${percent[1]}%` : lower.includes("sharp fall") ? "NIFTY falls by a sharp amount" : null;
  const holdingMatch = lower.match(/(\d+)\s*(?:day|days|trading day|trading days)/);
  const holdingPeriod = holdingMatch ? Number(holdingMatch[1]) : null;
  const missingInformation = [];
  if (!instrument) missingInformation.push({ field: "instrument", question: "Which instrument should we test?", reason: "A market series is required to run the experiment." });
  if (!fall) missingInformation.push({ field: "entryCondition", question: "What should count as a fall?", reason: "The entry threshold materially changes the sample of trades." });
  if (lower.includes("sharp fall") && !percent) missingInformation.push({ field: "fallThreshold", question: "What should a sharp fall mean: 1%, 2%, or 3%?", reason: "The phrase is ambiguous and changes which days qualify." });
  if (!holdingPeriod) missingInformation.push({ field: "holdingPeriod", question: "How long should the position be held?", reason: "Holding period materially affects measured return." });
  if (!lower.includes("exit") && !holdingPeriod) missingInformation.push({ field: "exitCondition", question: "How should the position be exited?", reason: "An experiment needs a defined exit rule." });
  const filters = lower.includes("volatility") ? ["High volatility"] : [];
  return { question, instrument, timeframe: instrument ? "daily" : null, entryCondition: fall, exitCondition: holdingPeriod ? "Close after holding period" : null, holdingPeriod, holdingPeriodUnit: holdingPeriod ? "trading_days" : null, filters, hypothesis: instrument ? `Does buying ${instrument} after the defined fall produce a positive edge${filters.length ? " during high-volatility periods" : ""}?` : null, missingInformation, needsClarification: missingInformation.length > 0 };
}
