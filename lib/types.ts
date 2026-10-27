export type EmploymentType = "C2C" | "W2" | "Full-time" | "Contract" | "Any";
export type WorkLocationType = "Onsite" | "Hybrid" | "Remote" | "Flexible";
export type CandidateSource = "linkedin" | "indeed" | "github" | "web";
export type ContactVerificationStatus = "verified" | "enriched" | "inferred" | "pending";

export interface JobDescription {
  id: string;
  title: string;
  client: string;
  location: string;
  workLocationType: WorkLocationType;
  workDaysDetail?: string; // e.g. "5 Days/Week"
  employmentType: EmploymentType;
  rateInfo?: string; // e.g. "Rate not a constraint for strong candidates"
  experienceRequiredYears: number;
  mustHaveKeywords: string[];
  preferredKeywords: string[];
  domainFocus: string[];
  responsibilities: string[];
  rawText: string;
  summary: string;
  createdAt: string;
}

export interface CandidateProfile {
  id: string;
  fullName: string;
  headline: string;
  currentCompany: string;
  currentTitle: string;
  location: string;
  yearsOfExperience: number;
  openToWork: boolean;
  openToWorkBadgeDetected: boolean;
  profileUrl: string;
  source: CandidateSource;
  avatarUrl?: string;
  skills: string[];
  matchingKeywords: string[];
  missingKeywords: string[];
  matchScore: number; // 0-100%
  summary: string;
  recentRole: string;
  education?: string;
  email?: string;
  phone?: string;
  contactStatus: ContactVerificationStatus;
  xraySnippet?: string;
}

export interface SearchQueryConfig {
  job: JobDescription;
  openToWorkOnly: boolean;
  minExperienceYears?: number;
  platform: "all" | "linkedin" | "indeed" | "github";
  apiKeys?: {
    serpapi?: string;
    proxycurl?: string;
    apollo?: string;
    hunter?: string;
  };
}

export interface BooleanXRayQueries {
  linkedinOpenToWork: string;
  linkedinBroadSourcing: string;
  indeedResumes: string;
  githubTechSearch: string;
  googleSearchUrlLinkedIn: string;
  googleSearchUrlIndeed: string;
  googleSearchUrlGitHub: string;
}

export interface OutreachDraft {
  candidateId: string;
  candidateName: string;
  channel: "inmail" | "email" | "sms";
  subject: string;
  body: string;
  callToAction: string;
}

export interface ApiConfiguration {
  serpApiKey?: string;
  proxycurlApiKey?: string;
  apolloApiKey?: string;
  hunterApiKey?: string;
  useLiveApis: boolean;
}
