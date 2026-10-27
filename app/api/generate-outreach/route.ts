import { NextRequest, NextResponse } from "next/server";
import { generateOutreachMessage } from "@/lib/outreach-generator";
import { CandidateProfile, JobDescription } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { candidate, job, channel = "inmail" } = body;

    if (!candidate || !job) {
      return NextResponse.json(
        { success: false, error: "Candidate and Job objects are required." },
        { status: 400 }
      );
    }

    const outreach = generateOutreachMessage(
      candidate as CandidateProfile,
      job as JobDescription,
      channel as "inmail" | "email" | "sms"
    );

    return NextResponse.json({
      success: true,
      outreach,
    });
  } catch (error) {
    console.error("Error generating outreach:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
