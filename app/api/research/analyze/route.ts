import { NextResponse } from "next/server";
import { analyzeLocally, experimentSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";
    if (question.length < 12) return NextResponse.json({ error: "Please enter a more specific research question." }, { status: 400 });
    const result = experimentSchema.parse(analyzeLocally(question));
    return NextResponse.json(result);
  } catch { return NextResponse.json({ error: "We couldn't analyze the question right now. Please try again." }, { status: 500 }); }
}
