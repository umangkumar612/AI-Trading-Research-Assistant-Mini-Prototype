import { NextResponse } from "next/server";
import { runBacktest } from "@/lib/backtest";
import { experimentSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try { const body = await request.json(); const experiment = experimentSchema.parse(body.experiment); return NextResponse.json(runBacktest(experiment)); }
  catch { return NextResponse.json({ error: "We couldn't run this experiment. Please review the experiment details." }, { status: 400 }); }
}
