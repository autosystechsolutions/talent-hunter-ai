import { NextRequest, NextResponse } from "next/server";
import { searchCandidates } from "@/lib/sourcing-service";
import { JobDescription } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { job, openToWorkOnly = false, minExperienceYears = 0, platform = "all", apiKeys } = body;

    if (!job || !job.title || !job.mustHaveKeywords) {
      return NextResponse.json(
        { success: false, error: "Valid JobDescription is required." },
        { status: 400 }
      );
    }

    const candidates = await searchCandidates({
      job: job as JobDescription,
      openToWorkOnly: Boolean(openToWorkOnly),
      minExperienceYears: Number(minExperienceYears),
      platform: platform as "all" | "linkedin" | "indeed" | "github",
      apiKeys,
    });

    return NextResponse.json({
      success: true,
      candidates,
      count: candidates.length,
    });
  } catch (error) {
    console.error("Error searching candidates:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
