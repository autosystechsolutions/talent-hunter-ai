import { CandidateProfile } from "./types";

export function exportCandidatesToCSV(candidates: CandidateProfile[], jobTitle: string): void {
  if (candidates.length === 0) return;

  const headers = [
    "Full Name",
    "Current Title",
    "Current Company",
    "Location",
    "Match Score",
    "Open To Work",
    "Experience (Years)",
    "Contact Phone",
    "Contact Email",
    "Profile URL",
    "Source",
    "Matching Keywords",
    "Missing Keywords",
    "Contact Status"
  ];

  const escapeCSV = (field: string | number | boolean | undefined) => {
    if (field === undefined || field === null) return '""';
    const str = String(field).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = candidates.map(c => [
    escapeCSV(c.fullName),
    escapeCSV(c.currentTitle),
    escapeCSV(c.currentCompany),
    escapeCSV(c.location),
    escapeCSV(`${c.matchScore}%`),
    escapeCSV(c.openToWork ? "YES" : "NO"),
    escapeCSV(c.yearsOfExperience),
    escapeCSV(c.phone || "Not public (Use InMail)"),
    escapeCSV(c.email || "Not public (Use InMail)"),
    escapeCSV(c.profileUrl),
    escapeCSV(c.source.toUpperCase()),
    escapeCSV(c.matchingKeywords.join("; ")),
    escapeCSV(c.missingKeywords.join("; ")),
    escapeCSV(c.contactStatus.toUpperCase())
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  const sanitizedTitle = jobTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  link.setAttribute("href", url);
  link.setAttribute("download", `candidates_${sanitizedTitle}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
