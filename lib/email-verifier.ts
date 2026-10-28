import dns from "dns/promises";

export interface EmailVerificationResult {
  email: string;
  isValidSyntax: boolean;
  hasMxRecords: boolean;
  mxHost?: string;
  status: "deliverable_domain" | "invalid_domain" | "invalid_syntax";
  message: string;
}

export async function verifyEmailDomain(email: string): Promise<EmailVerificationResult> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      email,
      isValidSyntax: false,
      hasMxRecords: false,
      status: "invalid_syntax",
      message: "The email address syntax is invalid.",
    };
  }

  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) {
    return {
      email,
      isValidSyntax: false,
      hasMxRecords: false,
      status: "invalid_syntax",
      message: "Could not extract domain from email.",
    };
  }

  try {
    const mxRecords = await dns.resolveMx(domain);
    if (mxRecords && mxRecords.length > 0) {
      // Sort by priority
      mxRecords.sort((a, b) => a.priority - b.priority);
      return {
        email,
        isValidSyntax: true,
        hasMxRecords: true,
        mxHost: mxRecords[0].exchange,
        status: "deliverable_domain",
        message: `Domain ${domain} has active MX servers (${mxRecords[0].exchange}).`,
      };
    } else {
      return {
        email,
        isValidSyntax: true,
        hasMxRecords: false,
        status: "invalid_domain",
        message: `Domain ${domain} has no mail exchange (MX) records. Emails sent here will bounce.`,
      };
    }
  } catch (err) {
    return {
      email,
      isValidSyntax: true,
      hasMxRecords: false,
      status: "invalid_domain",
      message: `Failed to resolve MX records for ${domain}: ${(err as Error).message}`,
    };
  }
}
