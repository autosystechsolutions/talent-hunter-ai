"use client";

import React, { useState } from "react";
import { CandidateProfile, JobDescription } from "@/lib/types";
import { 
  Briefcase, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  Send
} from "lucide-react";

interface CandidateCardProps {
  candidate: CandidateProfile;
  job: JobDescription;
  onOpenOutreach: (candidate: CandidateProfile) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  job,
  onOpenOutreach,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "linkedin":
        return <span className="bg-[#0A66C2]/20 text-[#0A66C2] border border-[#0A66C2]/40 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">LinkedIn</span>;
      case "indeed":
        return <span className="bg-[#2164f3]/20 text-[#60a5fa] border border-[#2164f3]/40 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">Indeed Resume</span>;
      case "github":
        return <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">GitHub</span>;
      default:
        return <span className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">Web X-Ray</span>;
    }
  };

  return (
    <div className={`relative bg-[#0F141C] border rounded-xl p-5 transition-all duration-200 hover:border-[#2BA8FF]/50 hover:shadow-lg hover:shadow-[#2BA8FF]/5 ${
      candidate.openToWork ? "border-emerald-500/40 shadow-sm shadow-emerald-500/10" : "border-[#1E293B]"
    }`}>
      {/* Top Bar: Profile & Match Score */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#1A2332]">
        <div className="flex items-center gap-3">
          {/* Avatar Initials */}
          <div className="relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base bg-gradient-to-br from-[#1E293B] to-[#0F141C] border ${
              candidate.openToWork ? "border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/30" : "border-slate-600 text-slate-200"
            }`}>
              {candidate.fullName.split(" ").map(n => n[0]).join("")}
            </div>
            {candidate.openToWork && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0F141C] rounded-full" title="Open to Work" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-lg text-white tracking-tight">{candidate.fullName}</h3>
              {candidate.openToWork && (
                <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold px-2 py-0.5 rounded-full tracking-wide flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  OPEN TO WORK
                </span>
              )}
              {getSourceBadge(candidate.source)}
            </div>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              {candidate.currentTitle} • <span className="text-slate-300 font-semibold">{candidate.currentCompany}</span>
              <span className="text-slate-600">|</span>
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {candidate.location}
            </p>
          </div>
        </div>

        {/* Match Score Badge */}
        <div className="flex sm:flex-col items-center sm:items-end gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">JD Match</span>
            <span className={`text-xl font-extrabold px-2.5 py-0.5 rounded-lg border ${
              candidate.matchScore >= 95 
                ? "bg-emerald-950/70 text-emerald-400 border-emerald-500/50 shadow-sm shadow-emerald-500/20"
                : candidate.matchScore >= 85
                ? "bg-cyan-950/70 text-cyan-400 border-cyan-500/50"
                : "bg-amber-950/70 text-amber-400 border-amber-500/50"
            }`}>
              {candidate.matchScore}%
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {candidate.yearsOfExperience}+ Years Experience
          </span>
        </div>
      </div>

      {/* Headline & Summary */}
      <div className="py-3 text-xs text-slate-300 leading-relaxed border-b border-[#1A2332]/60">
        <p className="font-medium text-slate-200 mb-1">{candidate.headline}</p>
        <p className="text-slate-400 line-clamp-2">{candidate.summary}</p>
      </div>

      {/* Keywords Breakdown (Matched vs Missing) */}
      <div className="py-3 border-b border-[#1A2332]/60">
        <div className="flex items-center justify-between text-[11px] mb-2">
          <span className="font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D1BB90]" />
            Required Skills Alignment
          </span>
          <span className="text-slate-400">
            {candidate.matchingKeywords.length} of {candidate.matchingKeywords.length + candidate.missingKeywords.length} Must-Haves
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {candidate.matchingKeywords.map((kw, i) => (
            <span
              key={`match-${i}`}
              className="inline-flex items-center gap-1 bg-emerald-950/60 text-emerald-300 border border-emerald-600/30 text-[11px] px-2 py-0.5 rounded-md font-medium"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              {kw}
            </span>
          ))}

          {candidate.missingKeywords.map((kw, i) => (
            <span
              key={`missing-${i}`}
              className="inline-flex items-center gap-1 bg-slate-900 text-slate-500 border border-slate-800 text-[11px] px-2 py-0.5 rounded-md font-medium"
            >
              <XCircle className="w-3 h-3 text-slate-600" />
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Info & Outreach Bar */}
      <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Contact info badges */}
        <div className="flex flex-wrap items-center gap-2">
          {candidate.email ? (
            <button
              onClick={() => copyToClipboard(candidate.email!, "email")}
              className="inline-flex items-center gap-1.5 text-xs bg-[#161E2B] hover:bg-[#1E293B] text-slate-300 hover:text-white px-2.5 py-1 rounded-md border border-[#243144] transition-colors"
              title="Click to copy email"
            >
              <Mail className="w-3 h-3 text-[#2BA8FF]" />
              <span className="font-mono text-[11px]">{candidate.email}</span>
              {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
            </button>
          ) : (
            <span className="text-[11px] text-slate-500 italic flex items-center gap-1">
              <Mail className="w-3 h-3" /> Email private (Use InMail)
            </span>
          )}

          {candidate.phone && (
            <button
              onClick={() => copyToClipboard(candidate.phone!, "phone")}
              className="inline-flex items-center gap-1.5 text-xs bg-[#161E2B] hover:bg-[#1E293B] text-slate-300 hover:text-white px-2.5 py-1 rounded-md border border-[#243144] transition-colors"
              title="Click to copy phone"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="font-mono text-[11px]">{candidate.phone}</span>
              {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <a
            href={candidate.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 text-xs text-slate-300 hover:text-white bg-[#161E2B] hover:bg-[#1E293B] border border-[#243144] px-3 py-1.5 rounded-lg transition-colors"
          >
            Profile
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => onOpenOutreach(candidate)}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#080B0E] bg-gradient-to-r from-[#D1BB90] to-[#E2D2B0] hover:from-[#DFCDA7] hover:to-[#F1E3C5] px-3.5 py-1.5 rounded-lg shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            1-Click Outreach
          </button>
        </div>
      </div>
    </div>
  );
};
