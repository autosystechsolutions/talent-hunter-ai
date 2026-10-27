import { JobDescription, EmploymentType, WorkLocationType } from "./types";

const TECH_KEYWORD_TAXONOMY: string[] = [
  // Programming & Systems
  "Rust", "C++", "C++17", "C++20", "Embedded C", "C", "Python", "Bash", "Go", "Golang", "Java", "Kotlin", "Swift",
  // Automotive & Protocols
  "CCC Digital Key", "Car Connectivity Consortium", "NFC", "BLE", "Bluetooth", "UWB", "Ultra-Wideband",
  "CAN", "CANoe", "CANalyzer", "CANcase", "LIN", "Automotive Ethernet", "AUTOSAR", "Adaptive AUTOSAR",
  "Vehicle Access", "PEPS", "Keyless Entry", "In-Cabin Audio", "Infotainment", "HMI", "Android Automotive",
  // Firmware & Testing
  "Firmware Validation", "Firmware", "Embedded Software", "Wireshark", "ADB", "DLT", "HCI", "Linux", "Ubuntu", "QNX", "RTOS", "FreeRTOS",
  "AEC", "Beamforming", "VAD", "AGC", "ALSA", "Audio Weaver", "DSP", "Audio DSP", "Acoustics", "MATLAB", "Simulink",
  // Systems & Safety
  "MBSE", "SysML", "Cameo", "MagicDraw", "Systems Engineering", "Jama", "Jama Connect", "DOORS", "ISO 26262", "ASIL", "FMEA", "DFMEA",
  // Architecture & Practices
  "API Design", "SOLID", "TDD", "Unit Testing", "Git", "JIRA", "Confluence", "Agile", "Scrum", "CI/CD", "Docker"
];

export function parseJobDescription(rawText: string): JobDescription {
  const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);
  const fullText = rawText;

  // 1. Extract Job Title
  let title = "Software Engineer";
  const titlePatterns = [
    /(?:Position|Role|Job Title|Title)\s*[:-]\s*([^\n\r]+)/i,
    /Job Description:\s*([^\n\r]+)/i,
    /(Staff Rust Software Developer|Firmware QA Engineer|Senior Digital Key Engineer|Audio DSP Specialist|Senior Functional Systems Engineer)/i,
  ];
  for (const pat of titlePatterns) {
    const match = fullText.match(pat);
    if (match && match[1]) {
      title = match[1].replace(/^(?:Position|Role|Job Description)\s*[:-]?\s*/i, "").trim();
      break;
    }
  }
  if (title === "Software Engineer" && lines.length > 0) {
    // If not matched, use first sensible line under 60 chars that isn't a header
    const candidateLine = lines.find(l => l.length < 60 && !l.toLowerCase().startsWith("http") && !l.toLowerCase().includes("client:"));
    if (candidateLine) {
      title = candidateLine.replace(/^(Position|Role|Job Description)\s*[:-]?\s*/i, "").trim();
    }
  }

  // 2. Extract Client / Company
  let client = "Automotive OEM";
  const clientMatch = fullText.match(/(?:Client|Company|Account)\s*[:-]\s*([^\n\r,]+)/i);
  if (clientMatch && clientMatch[1]) {
    client = clientMatch[1].trim();
  } else {
    // Check known clients
    const knownClients = ["Ford", "Zoox", "Rivian", "Tesla", "Apple", "Google", "Waymo", "Lucid", "GM", "General Motors", "Toyota", "Stellantis", "Volvo", "NVIDIA"];
    for (const c of knownClients) {
      const rx = new RegExp(`\\b${c}\\b`, "i");
      if (rx.test(fullText)) {
        client = c;
        break;
      }
    }
  }

  // 3. Extract Location
  let location = "Palo Alto, CA";
  const locationPatterns = [
    /(?:Location|Work Location|Job Location)\s*[:-–]\s*([^\n\r]+)/i,
    /\b([A-Z][a-zA-Z\s]+,\s*[A-Z]{2})\b/,
  ];
  for (const pat of locationPatterns) {
    const match = fullText.match(pat);
    if (match && match[1]) {
      const locCandidate = match[1].split(/[\n;]/)[0].trim();
      if (!locCandidate.toLowerCase().includes("onsite") && !locCandidate.toLowerCase().includes("contract")) {
        location = locCandidate;
        break;
      }
    }
  }

  // 4. Extract Employment Type (C2C, W2, Full-time)
  let employmentType: EmploymentType = "Contract";
  if (/\b(?:C2C|Corp[- ]to[- ]Corp|Corp2Corp)\b/i.test(fullText)) {
    employmentType = "C2C";
  } else if (/\bW2\b/i.test(fullText)) {
    employmentType = "W2";
  } else if (/\b(?:Full-time|Fulltime|FTE|Permanent)\b/i.test(fullText)) {
    employmentType = "Full-time";
  }

  // 5. Extract Work Location Type (Onsite, Hybrid, Remote)
  let workLocationType: WorkLocationType = "Onsite";
  let workDaysDetail: string | undefined = undefined;
  if (/5\s*Days\s*\/\s*Week/i.test(fullText)) {
    workDaysDetail = "5 Days/Week";
    workLocationType = "Onsite";
  } else if (/\bRemote\b/i.test(fullText)) {
    workLocationType = "Remote";
  } else if (/\bHybrid\b/i.test(fullText)) {
    workLocationType = "Hybrid";
  } else if (/\bOnsite\b/i.test(fullText) || /\bOn-site\b/i.test(fullText)) {
    workLocationType = "Onsite";
  }

  // Rate Info
  let rateInfo = "Rate not a constraint for strong candidates";
  const rateMatch = fullText.match(/(?:Rate|Compensation|Pay Rate)\s*[:-]\s*([^\n\r]+)/i);
  if (rateMatch && rateMatch[1]) {
    rateInfo = rateMatch[1].trim();
  }

  // 6. Extract Experience Years
  let experienceRequiredYears = 5;
  const expMatch = fullText.match(/(\d+)\+?\s*(?:years?|yrs?)(?:\s+of)?(?:\s+(?:software|experience|embedded|hands-on|validation))/i) ||
                   fullText.match(/(\d+)\+?\s*(?:years?|yrs?)/i);
  if (expMatch && expMatch[1]) {
    experienceRequiredYears = parseInt(expMatch[1], 10);
  }

  // 7. Extract Must-Have Keywords
  const extractedMustHaves: Set<string> = new Set();
  
  // Check taxonomy against full text
  for (const kw of TECH_KEYWORD_TAXONOMY) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    if (regex.test(fullText)) {
      extractedMustHaves.add(kw);
    }
  }

  // Look for explicitly listed keywords in "Must-Have Keywords" table or section
  const mustHaveSectionMatch = fullText.match(/(?:Must-Have Keywords|Must Have|Key Requirements|Required Qualifications|Key Responsibilities)[\s\S]*?(?=\n\s*(?:Common Requirements|Preferred|Qualifications|Even better|Domain Focus|$))/i);
  if (mustHaveSectionMatch) {
    const rawSection = mustHaveSectionMatch[0];
    const words = rawSection.split(/[,;\n•\t\-]/).map(w => w.trim()).filter(w => w.length > 1 && w.length < 35);
    for (const w of words) {
      if (!w.toLowerCase().includes("qualification") && !w.toLowerCase().includes("requirement") && !w.toLowerCase().includes("responsible")) {
        // If it looks like a technical skill, add
        if (/^[A-Za-z0-9+#.\s/-]+$/.test(w) && w.length > 2) {
          extractedMustHaves.add(w);
        }
      }
    }
  }

  // Sort and select top must haves (up to 8)
  const mustHaveArray = Array.from(extractedMustHaves).slice(0, 8);
  if (mustHaveArray.length === 0) {
    mustHaveArray.push("Embedded Software", "Linux", "C++", "System Validation");
  }

  // 8. Extract Preferred Keywords
  const extractedPreferred: Set<string> = new Set();
  const preferredSectionMatch = fullText.match(/(?:Preferred Qualifications|Even better|Nice to have|Desired)[\s\S]*?(?=\n\s*(?:Qualifications|Key Responsibilities|Domain Focus|$))/i);
  if (preferredSectionMatch) {
    for (const kw of TECH_KEYWORD_TAXONOMY) {
      if (!extractedMustHaves.has(kw) && new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "i").test(preferredSectionMatch[0])) {
        extractedPreferred.add(kw);
      }
    }
  }
  const preferredArray = Array.from(extractedPreferred).slice(0, 6);

  // 9. Extract Responsibilities
  const responsibilities: string[] = [];
  const respMatch = fullText.match(/(?:Responsibilities|Key Responsibilities|In this position\.\.\.)[\s\S]*?(?=\n\s*(?:Qualifications|Requirements|Even better|Domain Focus|$))/i);
  if (respMatch) {
    const respLines = respMatch[0].split("\n")
      .map(l => l.replace(/^[•*\-\d.]\s*/, "").trim())
      .filter(l => l.length > 20 && !l.toLowerCase().startsWith("responsibilit"));
    responsibilities.push(...respLines.slice(0, 6));
  }
  if (responsibilities.length === 0) {
    responsibilities.push(
      `Drive end-to-end technical delivery for ${title} at ${client}.`,
      `Design, implement, and validate robust systems aligned with automotive standards.`,
      `Collaborate with cross-functional software, firmware, and test teams.`
    );
  }

  // 10. Generate Summary
  const summary = `${client} seeking ${title} in ${location} (${employmentType}, ${workLocationType}${workDaysDetail ? ` - ${workDaysDetail}` : ""}). Target profile: ${experienceRequiredYears}+ years experience with core focus on ${mustHaveArray.slice(0, 4).join(", ")}.`;

  const id = `job-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  return {
    id,
    title,
    client,
    location,
    workLocationType,
    workDaysDetail,
    employmentType,
    rateInfo,
    experienceRequiredYears,
    mustHaveKeywords: mustHaveArray,
    preferredKeywords: preferredArray,
    domainFocus: ["Automotive", "Embedded Systems", client],
    responsibilities,
    rawText,
    summary,
    createdAt: new Date().toISOString()
  };
}
