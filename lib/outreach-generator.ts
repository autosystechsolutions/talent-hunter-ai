import { CandidateProfile, JobDescription, OutreachDraft } from "./types";

export function generateOutreachMessage(
  candidate: CandidateProfile,
  job: JobDescription,
  channel: "inmail" | "email" | "sms" = "inmail"
): OutreachDraft {
  const firstName = candidate.fullName.split(" ")[0] || candidate.fullName;
  const topMatches = candidate.matchingKeywords.slice(0, 3).join(", ");
  const client = job.client;
  const title = job.title;
  const location = job.location;
  const workType = `${job.workLocationType}${job.workDaysDetail ? ` (${job.workDaysDetail})` : ""}`;
  const rateNotice = job.rateInfo || "Top-tier market rate (rate is not a constraint for high-impact talent)";

  if (channel === "inmail") {
    const subject = `Exclusive C2C Role: ${title} @ ${client} (${location})`;
    const body = `Hi ${firstName},

I came across your profile while searching for senior engineering talent in ${candidate.location} and was genuinely impressed by your hands-on background in ${topMatches}.

We are currently leading an exclusive talent search for a ${title} position supporting ${client} in ${location}. Given your expertise with ${candidate.skills.slice(0, 4).join(" and ")}, your profile stood out as an exceptional fit for what the engineering leadership is building.

Key Highlights of the Role:
• Position: ${title}
• Client: ${client}
• Location: ${location} (${workType})
• Arrangement: Contract (C2C)
• Compensation: ${rateNotice}
• Core Focus: ${job.mustHaveKeywords.slice(0, 4).join(", ")}

${candidate.openToWork ? "I noted that you're currently open to new opportunities, and we can move quickly with direct technical review and fast-track interviews." : "Even if you're not actively on the job market today, I'd love to share the technical scope and see if this aligns with your next career trajectory."}

Would you have 10-15 minutes this week for a brief introductory discussion? If so, what is the best number or email to connect with you?

Best regards,

AutoSys Technical Recruitment Team
talent@autosystechsolutions.com
https://autosystechsolutions.com`;

    return {
      candidateId: candidate.id,
      candidateName: candidate.fullName,
      channel: "inmail",
      subject,
      body,
      callToAction: "Schedule 15-min Technical Intro",
    };
  }

  if (channel === "email") {
    const subject = `Urgent Opening: ${title} at ${client} (${location}) [C2C - High Priority]`;
    const body = `Dear ${firstName},

Hope you are having a productive week.

I am reaching out from AutoSys Tech Solutions regarding an urgent C2C requirement for a ${title} supporting our client ${client} onsite in ${location}.

We identified your profile due to your verified background in ${candidate.currentTitle} and strong track record with ${topMatches}.

Role Synopsis:
- Role: ${title}
- Engagement: Long-term C2C Contract
- Client: ${client}
- Work Model: ${workType}
- Rate: ${rateNotice}
- Primary Tech Stack: ${job.mustHaveKeywords.join(", ")}

We have direct line access to the hiring managers and can schedule an initial technical conversation within 24-48 hours.

Could you let me know if you would be open to a confidential conversation? Please feel free to reply with your updated resume, contact number, and best time to connect.

Looking forward to hearing from you.

Warm regards,

Senior Technical Sourcer | AutoSys Tech Solutions
Email: talent@autosystechsolutions.com
Web: https://autosystechsolutions.com`;

    return {
      candidateId: candidate.id,
      candidateName: candidate.fullName,
      channel: "email",
      subject,
      body,
      callToAction: "Reply with Resume & Availability",
    };
  }

  // SMS / Quick Message
  const subject = `Quick check: ${title} role @ ${client}`;
  const body = `Hi ${firstName}, this is AutoSys Tech Solutions. We have an immediate C2C ${title} opening with ${client} in ${location} (${workType}, strong rates). Your background in ${topMatches} looks like an exact match. Are you open to a quick 5-min chat today or tomorrow? Let me know!`;

  return {
    candidateId: candidate.id,
    candidateName: candidate.fullName,
    channel: "sms",
    subject,
    body,
    callToAction: "Reply YES for brief call",
  };
}
