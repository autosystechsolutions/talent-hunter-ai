"use client";

import React, { useState } from "react";
import { BooleanXRayQueries } from "@/lib/types";
import { Search, ExternalLink, Copy, Check, Terminal, ShieldCheck } from "lucide-react";

interface BooleanXRayCardProps {
  queries: BooleanXRayQueries;
  title: string;
}

export const BooleanXRayCard: React.FC<BooleanXRayCardProps> = ({ queries, title }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-[#0F141C] border border-[#1E293B] rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1A2332]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#2BA8FF]/10 text-[#2BA8FF] border border-[#2BA8FF]/30">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              Live Google X-Ray & Boolean Sourcing Strings
            </h3>
            <p className="text-[11px] text-slate-400">
              Zero-cost recruiter search queries bypassing LinkedIn paywalls & limits
            </p>
          </div>
        </div>
        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          Zero Cost ($0.00)
        </span>
      </div>

      {/* Query 1: LinkedIn Open To Work */}
      <div className="bg-[#161E2B] border border-[#222E40] rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#0A66C2] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            1. LinkedIn &quot;Open to Work&quot; Deep Search
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleCopy(queries.linkedinOpenToWork, "li_otw")}
              className="text-[11px] text-slate-300 hover:text-white bg-[#1E293B] hover:bg-[#2A384F] px-2 py-1 rounded border border-[#2B3A4F] flex items-center gap-1 transition-colors"
            >
              {copiedKey === "li_otw" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copiedKey === "li_otw" ? "Copied" : "Copy"}
            </button>
            <a
              href={queries.googleSearchUrlLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-[#080B0E] bg-[#2BA8FF] hover:bg-[#52BAFF] px-2.5 py-1 rounded flex items-center gap-1 transition-colors"
            >
              Search Google
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <p className="font-mono text-[11px] text-slate-300 bg-[#0B0F15] p-2 rounded border border-[#1A2332] break-all select-all">
          {queries.linkedinOpenToWork}
        </p>
      </div>

      {/* Query 2: Indeed Resume Index */}
      <div className="bg-[#161E2B] border border-[#222E40] rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#60a5fa] flex items-center gap-1.5">
            <Search className="w-3 h-3 text-[#60a5fa]" />
            2. Indeed Resumes Public Index
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleCopy(queries.indeedResumes, "indeed")}
              className="text-[11px] text-slate-300 hover:text-white bg-[#1E293B] hover:bg-[#2A384F] px-2 py-1 rounded border border-[#2B3A4F] flex items-center gap-1 transition-colors"
            >
              {copiedKey === "indeed" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copiedKey === "indeed" ? "Copied" : "Copy"}
            </button>
            <a
              href={queries.googleSearchUrlIndeed}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-white bg-[#1D4ED8] hover:bg-[#2563EB] px-2.5 py-1 rounded flex items-center gap-1 transition-colors"
            >
              Search Indeed
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <p className="font-mono text-[11px] text-slate-300 bg-[#0B0F15] p-2 rounded border border-[#1A2332] break-all select-all">
          {queries.indeedResumes}
        </p>
      </div>

      {/* Query 3: GitHub Developer Search */}
      <div className="bg-[#161E2B] border border-[#222E40] rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
            <Search className="w-3 h-3 text-purple-400" />
            3. GitHub Engineers & Repositories
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleCopy(queries.githubTechSearch, "github")}
              className="text-[11px] text-slate-300 hover:text-white bg-[#1E293B] hover:bg-[#2A384F] px-2 py-1 rounded border border-[#2B3A4F] flex items-center gap-1 transition-colors"
            >
              {copiedKey === "github" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copiedKey === "github" ? "Copied" : "Copy"}
            </button>
            <a
              href={queries.googleSearchUrlGitHub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-white bg-purple-700 hover:bg-purple-600 px-2.5 py-1 rounded flex items-center gap-1 transition-colors"
            >
              Search GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <p className="font-mono text-[11px] text-slate-300 bg-[#0B0F15] p-2 rounded border border-[#1A2332] break-all select-all">
          {queries.githubTechSearch}
        </p>
      </div>
    </div>
  );
};
