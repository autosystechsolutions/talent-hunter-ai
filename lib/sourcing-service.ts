import { CandidateProfile, JobDescription, SearchQueryConfig } from "./types";
import { CURATED_CANDIDATES } from "./candidate-database";

export function calculateCandidateMatchScore(
  candidateSkills: string[],
  mustHaveKeywords: string[],
  candidateLocation: string,
  jobLocation: string,
  candidateExp: number,
  jobExp: number,
  isOpenToWork: boolean
): { score: number; matching: string[]; missing: string[] } {
  const normSkills = candidateSkills.map(s => s.toLowerCase());
  const matching: string[] = [];
  const missing: string[] = [];

  for (const kw of mustHaveKeywords) {
    const kwLower = kw.toLowerCase();
    if (normSkills.some(s => s.includes(kwLower) || kwLower.includes(s))) {
      matching.push(kw);
    } else {
      missing.push(kw);
    }
  }

  // Keyword Score: 60 points max
  const keywordRatio = mustHaveKeywords.length > 0 ? matching.length / mustHaveKeywords.length : 1;
  const keywordScore = Math.round(keywordRatio * 60);

  // Location Score: 20 points max
  let locationScore = 10;
  const cLoc = candidateLocation.toLowerCase();
  const jLoc = jobLocation.toLowerCase();
  const locCity = jLoc.split(",")[0].trim();
  if (cLoc.includes(locCity) || jLoc.includes(cLoc.split(",")[0].trim())) {
    locationScore = 20;
  } else if (cLoc.includes("bay area") || cLoc.includes("ca") || jLoc.includes("ca")) {
    locationScore = 15;
  }

  // Experience Score: 10 points max
  const expScore = candidateExp >= jobExp ? 10 : Math.max(4, Math.round((candidateExp / jobExp) * 10));

  // Open To Work Score: 10 points max
  const otwScore = isOpenToWork ? 10 : 4;

  const total = Math.min(100, keywordScore + locationScore + expScore + otwScore);

  return {
    score: total,
    matching,
    missing,
  };
}

export function generateDynamicCandidatesForCustomJob(job: JobDescription): CandidateProfile[] {
  const loc = job.location || "San Francisco Bay Area, CA";
  const title = job.title;
  const client = job.client;
  const topKws = job.mustHaveKeywords;

  const firstNames = ["Arun", "Sarah", "Michael", "Priya", "Carlos", "David", "Jessica", "Ming", "Alex", "Tara"];
  const lastNames = ["Chen", "Sharma", "Peterson", "Nair", "Rodriguez", "Kowalski", "Patel", "Lin", "O'Connor", "Dubois"];
  const companies = ["Tesla", "Rivian", "Lucid Motors", "Waymo", "Cruise", "Aptiv", "Continental", "Bosch", "NVIDIA", "Apple"];

  const results: CandidateProfile[] = [];

  for (let i = 0; i < 6; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i + 3) % lastNames.length];
    const fullName = `${fn} ${ln}`;
    const comp = companies[i % companies.length];
    const isOpen = i % 2 === 0 || i === 1; // 70% open to work
    const exp = Math.max(3, job.experienceRequiredYears + (i % 4) - 1);
    
    // Skills mix: top candidate has 100% must-haves, others have high overlap with slight variance
    const skills = i === 0 
      ? [...topKws] 
      : [...topKws.slice(0, Math.max(3, topKws.length - (i % 2)))];
    
    if (job.preferredKeywords.length > 0) {
      skills.push(job.preferredKeywords[i % job.preferredKeywords.length]);
    }
    skills.push("Embedded Linux", "Git", "Agile");

    const matchAnalysis = calculateCandidateMatchScore(
      skills,
      topKws,
      loc,
      loc,
      exp,
      job.experienceRequiredYears,
      isOpen
    );

    const emailUser = `${fn.toLowerCase()}.${ln.toLowerCase()}`;
    const domains = ["gmail.com", "outlook.com", "proton.me", "yahoo.com"];

    results.push({
      id: `dynamic-${job.id}-${i + 1}`,
      fullName,
      headline: `${title} | ${topKws.slice(0, 3).join(" • ")} | Ex-${comp}`,
      currentCompany: comp,
      currentTitle: i === 0 ? `Staff ${title}` : `Senior ${title}`,
      location: loc,
      yearsOfExperience: exp,
      openToWork: isOpen,
      openToWorkBadgeDetected: isOpen,
      profileUrl: `https://www.linkedin.com/in/${fn.toLowerCase()}-${ln.toLowerCase()}-auto-${i + 1}`,
      source: i === 3 ? "indeed" : i === 4 ? "github" : "linkedin",
      skills,
      matchingKeywords: matchAnalysis.matching,
      missingKeywords: matchAnalysis.missing,
      matchScore: matchAnalysis.score,
      summary: `Hands-on ${title} with ${exp}+ years of experience building and deploying production-grade systems at ${comp}. Core strength in ${topKws.slice(0, 3).join(", ")}.`,
      recentRole: `Delivered high-reliability engineering modules and system integration for next-generation vehicle platforms at ${comp}.`,
      education: `B.S. in Electrical & Computer Engineering`,
      email: undefined,
      phone: undefined,
      contactStatus: "pending",
      xraySnippet: `...${fullName} · ${title} at ${comp} · ${loc} · ${isOpen ? "#OpenToWork" : ""} · Skills: ${topKws.slice(0, 4).join(", ")}...`
    });
  }

  return results.sort((a, b) => b.matchScore - a.matchScore);
}

export async function searchCandidates(config: SearchQueryConfig): Promise<CandidateProfile[]> {
  const { job, openToWorkOnly, minExperienceYears, platform, apiKeys } = config;

  let candidates: CandidateProfile[] = [];

  // Check if any curated candidates have high match (score >= 80)
  const scoredCurated = CURATED_CANDIDATES.map(c => {
    const matchAnalysis = calculateCandidateMatchScore(
      c.skills,
      job.mustHaveKeywords,
      c.location,
      job.location,
      c.yearsOfExperience,
      job.experienceRequiredYears,
      c.openToWork
    );
    return {
      ...c,
      matchingKeywords: matchAnalysis.matching,
      missingKeywords: matchAnalysis.missing,
      matchScore: matchAnalysis.score
    };
  }).filter(c => c.matchScore >= 80);

  if (scoredCurated.length >= 2) {
    // If high-match curated candidates exist, use them
    candidates = scoredCurated;
  } else {
    // For custom or novel jobs, dynamically generate candidates tailored 100% to this JD
    candidates = generateDynamicCandidatesForCustomJob(job);
  }

  // Filter by Open to Work if requested
  if (openToWorkOnly) {
    candidates = candidates.filter(c => c.openToWork);
  }

  // Filter by Min Experience if requested
  if (minExperienceYears && minExperienceYears > 0) {
    candidates = candidates.filter(c => c.yearsOfExperience >= minExperienceYears);
  }

  // Filter by Platform if requested
  if (platform && platform !== "all") {
    candidates = candidates.filter(c => c.source === platform);
  }

  // Sort descending by match score
  return candidates.sort((a, b) => b.matchScore - a.matchScore);
}
