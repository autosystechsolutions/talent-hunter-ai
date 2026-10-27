"use client";

import React, { useState, useEffect, useMemo } from "react";
import { PRESET_JOBS } from "@/lib/preset-jobs";
import { JobDescription, CandidateProfile, ApiConfiguration } from "@/lib/types";
import { parseJobDescription } from "@/lib/jd-parser";
import { generateBooleanXRayQueries } from "@/lib/xray-engine";
import { searchCandidates } from "@/lib/sourcing-service";
import { CandidateCard } from "@/components/CandidateCard";
import { BooleanXRayCard } from "@/components/BooleanXRayCard";
import { OutreachModal } from "@/components/OutreachModal";
import { SettingsModal } from "@/components/SettingsModal";
import { exportCandidatesToCSV } from "@/lib/export-utils";
import { 
  Briefcase, 
  MapPin, 
  Sparkles, 
  Download, 
  Settings, 
  Search, 
  Building2, 
  FileText, 
  CheckCircle, 
  Clock, 
  Users, 
  ArrowRight,
  RefreshCw,
  ExternalLink,
  ShieldAlert
} from "lucide-react";

export default function TalentHunterDashboard() {
  // Active selected Job
  const [activeJob, setActiveJob] = useState<JobDescription>(PRESET_JOBS[0]);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>("");
  const [isParsing, setIsParsing] = useState<boolean>(false);

  // Search & Filter States
  const [openToWorkOnly, setOpenToWorkOnly] = useState<boolean>(false);
  const [minMatchScore, setMinMatchScore] = useState<number>(0);
  const [selectedPlatform, setSelectedPlatform] = useState<"all" | "linkedin" | "indeed" | "github">("all");
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState<boolean>(false);

  // Outreach Modal state
  const [outreachCandidate, setOutreachCandidate] = useState<CandidateProfile | null>(null);
  const [isOutreachOpen, setIsOutreachOpen] = useState<boolean>(false);

  // Settings Modal state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [apiConfig, setApiConfig] = useState<ApiConfiguration>({ useLiveApis: false });

  // Generate X-Ray queries for the active job
  const xrayQueries = useMemo(() => generateBooleanXRayQueries(activeJob), [activeJob]);

  // Load Candidates whenever activeJob, openToWorkOnly, or platform changes
  useEffect(() => {
    let isMounted = true;
    setIsLoadingCandidates(true);

    searchCandidates({
      job: activeJob,
      openToWorkOnly,
      platform: selectedPlatform,
    })
      .then((res) => {
        if (isMounted) {
          setCandidates(res);
          setIsLoadingCandidates(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load candidates:", err);
        if (isMounted) setIsLoadingCandidates(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeJob, openToWorkOnly, selectedPlatform]);

  // Handle parsing a custom pasted JD
  const handleParseCustomJD = () => {
    if (!customText.trim()) return;
    setIsParsing(true);
    setTimeout(() => {
      try {
        const parsed = parseJobDescription(customText);
        setActiveJob(parsed);
        setIsCustomMode(false);
      } catch (e) {
        console.error("Parsing failed:", e);
      } finally {
        setIsParsing(false);
      }
    }, 400);
  };

  // Filter candidates by min match score
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => c.matchScore >= minMatchScore);
  }, [candidates, minMatchScore]);

  // Quick stats
  const totalOpenToWork = useMemo(() => {
    return candidates.filter((c) => c.openToWork).length;
  }, [candidates]);

  const avgMatchScore = useMemo(() => {
    if (candidates.length === 0) return 0;
    const sum = candidates.reduce((acc, curr) => acc + curr.matchScore, 0);
    return Math.round(sum / candidates.length);
  }, [candidates]);

  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F0F5FA] flex flex-col font-sans">
      {/* Top Navigation & Executive Header */}
      <header className="sticky top-0 z-40 bg-[#0B0F15]/95 backdrop-blur-md border-b border-[#1A2332]">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D1BB90] to-[#8C7A55] p-[1px] shadow-lg shadow-[#D1BB90]/10">
              <div className="w-full h-full bg-[#080B0E] rounded-[11px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D1BB90] to-[#F3E7CA] text-lg tracking-tighter">
                  AS
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base text-white tracking-tight">
                  AutoSys <span className="text-[#2BA8FF]">TalentHunter</span> AI
                </h1>
                <span className="bg-[#2BA8FF]/10 text-[#2BA8FF] border border-[#2BA8FF]/30 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                  v2.0 PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Autonomous Sourcing Engine for Automotive & Embedded Systems
              </p>
            </div>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 bg-[#0F141C] border border-[#1E293B] rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400">Open Roles:</span>
              <span className="font-bold text-white">5 Active (Ford / Zoox)</span>
            </div>
            <div className="h-3 w-[1px] bg-[#243144]" />
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#2BA8FF]" />
              <span className="text-slate-400">Pipeline Candidates:</span>
              <span className="font-bold text-white">{candidates.length}</span>
            </div>
            <div className="h-3 w-[1px] bg-[#243144]" />
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Open to Work:</span>
              <span className="font-bold text-emerald-400">{totalOpenToWork} Candidates</span>
            </div>
            <div className="h-3 w-[1px] bg-[#243144]" />
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Avg JD Match:</span>
              <span className="font-bold text-[#D1BB90]">{avgMatchScore}%</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => exportCandidatesToCSV(filteredCandidates, activeJob.title)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#161E2B] hover:bg-[#1E293B] border border-[#243144] px-3.5 py-2 rounded-lg transition-colors"
              title="Export Sourced Candidates to CSV / ATS format"
            >
              <Download className="w-3.5 h-3.5 text-[#2BA8FF]" />
              Export CSV
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#161E2B] hover:bg-[#1E293B] border border-[#243144] px-3.5 py-2 rounded-lg transition-colors"
              title="Configure SerpAPI, Proxycurl & Apollo keys"
            >
              <Settings className="w-3.5 h-3.5 text-[#D1BB90]" />
              API Connectors
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Job Selector & JD Inspector (5 of 12 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 1. Preset Role Quick Buttons */}
            <div className="bg-[#0F141C] border border-[#1E293B] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#D1BB90]" />
                  Active AutoSys Open Roles (5 Positions)
                </span>
                <button
                  onClick={() => setIsCustomMode(!isCustomMode)}
                  className="text-xs font-semibold text-[#2BA8FF] hover:underline flex items-center gap-1"
                >
                  {isCustomMode ? "← View Presets" : "+ Paste Any Custom JD"}
                </button>
              </div>

              {!isCustomMode ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_JOBS.map((job) => {
                    const isSelected = activeJob.id === job.id;
                    return (
                      <button
                        key={job.id}
                        onClick={() => setActiveJob(job)}
                        className={`text-left p-3 rounded-lg border transition-all text-xs flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? "bg-[#161E2B] border-[#2BA8FF] text-white shadow-md shadow-[#2BA8FF]/10 ring-1 ring-[#2BA8FF]"
                            : "bg-[#0B0F15] border-[#1A2332] text-slate-300 hover:border-slate-700 hover:text-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-semibold line-clamp-1">{job.title}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 shrink-0">
                            {job.client}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{job.location}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-medium">C2C</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Custom JD Paste Area */
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Paste any Job Description (raw text, email, or bullet points):</span>
                  </div>
                  <textarea
                    rows={7}
                    placeholder="e.g. Position: Senior Embedded Linux Developer&#10;Location: Austin, TX&#10;Client: Tesla&#10;Requirements: Linux Kernel, C++, Yocto, CAN bus, 5+ years experience..."
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full bg-[#0B0F15] border border-[#243144] focus:border-[#2BA8FF] rounded-lg p-3 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:ring-1 focus:ring-[#2BA8FF]"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setCustomText(PRESET_JOBS[0].rawText);
                      }}
                      className="text-[11px] text-slate-400 hover:text-slate-200 underline"
                    >
                      Load Sample Staff Rust JD
                    </button>
                    <button
                      onClick={handleParseCustomJD}
                      disabled={isParsing || !customText.trim()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-gradient-to-r from-[#2BA8FF] to-[#1D4ED8] hover:from-[#40B2FF] hover:to-[#2563EB] text-white shadow-sm transition-all disabled:opacity-50"
                    >
                      {isParsing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Parsing JD...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          ⚡ Auto-Parse JD & Sourcing Points
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Active JD Inspector Card */}
            <div className="bg-[#0F141C] border border-[#1E293B] rounded-xl p-5 space-y-4">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#1A2332]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="bg-[#D1BB90]/20 text-[#D1BB90] border border-[#D1BB90]/40 text-[11px] font-bold px-2 py-0.5 rounded">
                      Client: {activeJob.client}
                    </span>
                    <span className="bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 text-[11px] font-semibold px-2 py-0.5 rounded">
                      {activeJob.employmentType} (Contract)
                    </span>
                    <span className="bg-cyan-950/70 text-cyan-400 border border-cyan-500/40 text-[11px] font-semibold px-2 py-0.5 rounded">
                      {activeJob.workLocationType} {activeJob.workDaysDetail ? `• ${activeJob.workDaysDetail}` : ""}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{activeJob.title}</h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {activeJob.location}
                    <span className="text-slate-600">|</span>
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {activeJob.experienceRequiredYears}+ Years Required
                  </p>
                </div>
              </div>

              {/* Rate & Compensation badge */}
              <div className="p-2.5 rounded-lg bg-[#161E2B] border border-[#222E40] text-xs flex items-center justify-between">
                <span className="text-slate-400 font-medium">Compensation Rate:</span>
                <span className="text-[#D1BB90] font-bold">{activeJob.rateInfo}</span>
              </div>

              {/* Must-Have Keywords Badges */}
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Extracted Must-Have Keywords
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeJob.mustHaveKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="bg-[#2BA8FF]/10 text-[#2BA8FF] border border-[#2BA8FF]/30 text-xs px-2.5 py-1 rounded-md font-semibold"
                    >
                      {kw}
                    </span>
                  ))}
                  {activeJob.preferredKeywords.map((kw, i) => (
                    <span
                      key={`pref-${i}`}
                      className="bg-slate-800 text-slate-400 border border-slate-700 text-xs px-2 py-1 rounded-md font-normal"
                    >
                      +{kw} (Nice to have)
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="pt-2 border-t border-[#1A2332] text-xs text-slate-300 leading-relaxed">
                <p className="text-slate-400">{activeJob.summary}</p>
              </div>

              {/* Responsibilities */}
              {activeJob.responsibilities && activeJob.responsibilities.length > 0 && (
                <div className="pt-2 border-t border-[#1A2332] space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Technical Responsibilities
                  </span>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {activeJob.responsibilities.slice(0, 4).map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 3. Live Google X-Ray & Boolean Sourcing Strings */}
            <BooleanXRayCard queries={xrayQueries} title={activeJob.title} />

          </div>

          {/* RIGHT COLUMN: Candidate Pipeline & Match Matrix (7 of 12 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Filter & Sourcing Toolbar */}
            <div className="bg-[#0F141C] border border-[#1E293B] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  Matching Candidate Pipeline
                  <span className="bg-[#2BA8FF]/20 text-[#2BA8FF] text-xs px-2 py-0.5 rounded-full font-mono">
                    {filteredCandidates.length} Found
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ranked by must-have skills, location proximity & Open to Work signals
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                {/* Open to Work Toggle */}
                <button
                  onClick={() => setOpenToWorkOnly(!openToWorkOnly)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    openToWorkOnly
                      ? "bg-emerald-950 text-emerald-300 border-emerald-500 shadow-sm shadow-emerald-500/20"
                      : "bg-[#161E2B] text-slate-400 border-[#243144] hover:text-slate-200"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${openToWorkOnly ? "bg-emerald-400" : "bg-slate-500"}`} />
                  Open to Work Only
                </button>

                {/* Platform Filter */}
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value as "all" | "linkedin" | "indeed" | "github")}
                  className="bg-[#161E2B] border border-[#243144] text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#2BA8FF]"
                >
                  <option value="all">All Sources (LinkedIn, Indeed, GitHub)</option>
                  <option value="linkedin">LinkedIn Only</option>
                  <option value="indeed">Indeed Resumes Only</option>
                  <option value="github">GitHub Developers</option>
                </select>

                {/* Score Filter */}
                <select
                  value={minMatchScore}
                  onChange={(e) => setMinMatchScore(Number(e.target.value))}
                  className="bg-[#161E2B] border border-[#243144] text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#2BA8FF]"
                >
                  <option value={0}>All Match Scores</option>
                  <option value={85}>85%+ Match</option>
                  <option value={90}>90%+ Match</option>
                  <option value={95}>95%+ Match</option>
                </select>
              </div>
            </div>

            {/* Candidate List View */}
            {isLoadingCandidates ? (
              <div className="p-12 text-center bg-[#0F141C] border border-[#1E293B] rounded-xl space-y-3">
                <RefreshCw className="w-8 h-8 text-[#2BA8FF] animate-spin mx-auto" />
                <p className="text-sm font-semibold text-white">Sourcing & Scoring Matching Candidates...</p>
                <p className="text-xs text-slate-500">Cross-referencing technical skills against {activeJob.title} criteria</p>
              </div>
            ) : filteredCandidates.length === 0 ? (
              <div className="p-12 text-center bg-[#0F141C] border border-[#1E293B] rounded-xl space-y-3">
                <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto" />
                <p className="text-sm font-semibold text-white">No candidates match current filter thresholds</p>
                <p className="text-xs text-slate-400">
                  Try unchecking &quot;Open to Work Only&quot; or lowering the minimum match score threshold.
                </p>
                <button
                  onClick={() => {
                    setOpenToWorkOnly(false);
                    setMinMatchScore(0);
                    setSelectedPlatform("all");
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#2BA8FF] font-semibold hover:underline mt-2"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    job={activeJob}
                    onOpenOutreach={(c) => {
                      setOutreachCandidate(c);
                      setIsOutreachOpen(true);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Recruiter Tips Footer Card */}
            <div className="p-4 rounded-xl bg-[#0B0F15] border border-[#1A2332] text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <Sparkles className="w-4 h-4 text-[#D1BB90]" />
                AutoSys Technical Recruiting Pro-Tip
              </div>
              <p className="leading-relaxed">
                For C2C Automotive positions with Tier-1 clients (Ford, Zoox), candidates marked with{" "}
                <span className="text-emerald-400 font-bold">OPEN TO WORK</span> have typically completed prior consulting engagements and can interview within 24-48 hours. Use the{" "}
                <span className="text-white font-semibold">&quot;1-Click Outreach&quot;</span> button to generate InMail messages tailored with the rate notice (&quot;Rate not a constraint for strong candidates&quot;) to achieve high response rates.
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* Outreach Modal */}
      <OutreachModal
        isOpen={isOutreachOpen}
        onClose={() => setIsOutreachOpen(false)}
        candidate={outreachCandidate}
        job={activeJob}
      />

      {/* API Key Configuration Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(cfg) => setApiConfig(cfg)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[#1A2332] bg-[#080B0E] py-4 text-center text-xs text-slate-500">
        <p>AutoSys TalentHunter AI • Automotive Embedded & EV Talent Acquisition Platform • Ford / Zoox / Tier-1 OEM Sourcing</p>
      </footer>
    </div>
  );
}
