import { NextRequest, NextResponse } from "next/server";
import { parseJobDescription } from "@/lib/jd-parser";
import { generateBooleanXRayQueries } from "@/lib/xray-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Job description text is required." },
        { status: 400 }
      );
    }

    const job = parseJobDescription(text);
    const xrayQueries = generateBooleanXRayQueries(job);

    return NextResponse.json({
      success: true,
      job,
      xrayQueries,
    });
  } catch (error) {
    console.error("Error parsing JD:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
