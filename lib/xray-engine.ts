import { JobDescription, BooleanXRayQueries } from "./types";

export function generateBooleanXRayQueries(job: JobDescription): BooleanXRayQueries {
  const topSkills = job.mustHaveKeywords.slice(0, 4);
  const skillClause = topSkills.map(s => `"${s}"`).join(" AND ");
  const skillOrClause = topSkills.map(s => `"${s}"`).join(" OR ");
  
  // Clean location (e.g. "Palo Alto, CA" -> "Palo Alto" OR "San Francisco Bay Area")
  const locRaw = job.location.split(",")[0].trim();
  const locationClause = `("${locRaw}" OR "San Francisco Bay Area" OR "California")`;

  // 1. LinkedIn Open to Work specific query
  const linkedinOpenToWork = `site:linkedin.com/in ("open to work" OR "open for opportunities" OR "actively looking" OR "immediate joiner") AND ("${job.title}" OR (${skillOrClause})) AND ${skillClause} AND ${locationClause}`;

  // 1b. LinkedIn Public Personal Email finder (Candidates who posted their real @gmail or email in bio)
  const linkedinPublicEmails = `site:linkedin.com/in ("@gmail.com" OR "@yahoo.com" OR "reach me at" OR "email me at") AND ("open to work" OR "open for opportunities") AND ("${topSkills[0] || job.title}") AND ${locationClause}`;

  // 2. LinkedIn Broad Deep Technical X-Ray
  const linkedinBroadSourcing = `site:linkedin.com/in ("${job.title}" OR "${topSkills[0] || 'Embedded'}") AND (${skillClause}) AND ${locationClause} -intitle:"jobs" -intitle:"profiles" -intitle:"recruiter"`;

  // 3. Indeed Resumes
  const indeedResumes = `site:indeed.com/r ("${job.title}" OR ${topSkills[0] ? `"${topSkills[0]}"` : ""}) AND (${skillClause}) "${locRaw}"`;

  // 4. GitHub Technical Sourcing
  const githubTechSearch = `site:github.com ("${topSkills[0] || 'Rust'}" AND "${topSkills[1] || 'C++'}") "${locRaw}" "joined on"`;

  return {
    linkedinOpenToWork,
    linkedinBroadSourcing,
    linkedinPublicEmails,
    indeedResumes,
    githubTechSearch,
    googleSearchUrlLinkedIn: `https://www.google.com/search?q=${encodeURIComponent(linkedinOpenToWork)}`,
    googleSearchUrlEmails: `https://www.google.com/search?q=${encodeURIComponent(linkedinPublicEmails)}`,
    googleSearchUrlIndeed: `https://www.google.com/search?q=${encodeURIComponent(indeedResumes)}`,
    googleSearchUrlGitHub: `https://www.google.com/search?q=${encodeURIComponent(githubTechSearch)}`,
  };
}
