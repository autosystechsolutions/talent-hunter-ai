import { NextRequest, NextResponse } from "next/server";
import { verifyEmailDomain } from "@/lib/email-verifier";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email string is required." },
        { status: 400 }
      );
    }

    const verification = await verifyEmailDomain(email.trim());
    return NextResponse.json({
      success: true,
      verification,
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
