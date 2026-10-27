"use client";

import React, { useState, useEffect } from "react";
import { CandidateProfile, JobDescription, OutreachDraft } from "@/lib/types";
import { generateOutreachMessage } from "@/lib/outreach-generator";
import { 
  X, 
  Copy, 
  Check, 
  Send, 
  Mail, 
  MessageSquare, 
  ExternalLink,
  Sparkles
} from "lucide-react";

interface OutreachModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateProfile | null;
  job: JobDescription | null;
}

export const OutreachModal: React.FC<OutreachModalProps> = ({
  isOpen,
  onClose,
  candidate,
  job,
}) => {
  const [channel, setChannel] = useState<"inmail" | "email" | "sms">("inmail");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (candidate && job) {
      const draft: OutreachDraft = generateOutreachMessage(candidate, job, channel);
      setSubject(draft.subject);
      setBody(draft.body);
      setCopied(false);
    }
  }, [candidate, job, channel]);

  if (!isOpen || !candidate || !job) return null;

  const handleCopy = () => {
    const fullText = channel === "sms" ? body : `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMailTo = () => {
    if (candidate.email) {
      const mailtoUrl = `mailto:${candidate.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#0F141C] border border-[#243144] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2332] bg-[#161E2B]/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#D1BB90]/10 border border-[#D1BB90]/30 text-[#D1BB90]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Personalized Recruiter Outreach
                <span className="text-xs font-normal text-slate-400">
                  for <span className="text-[#2BA8FF] font-semibold">{candidate.fullName}</span>
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Targeting: {job.title} @ {job.client} ({job.location})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1E293B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channel Switcher */}
        <div className="flex border-b border-[#1A2332] px-6 bg-[#0B0F15]">
          <button
            onClick={() => setChannel("inmail")}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
              channel === "inmail"
                ? "border-[#0A66C2] text-[#2BA8FF] bg-[#0A66C2]/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Send className="w-3.5 h-3.5 text-[#0A66C2]" />
            LinkedIn InMail
          </button>
          <button
            onClick={() => setChannel("email")}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
              channel === "email"
                ? "border-[#D1BB90] text-[#D1BB90] bg-[#D1BB90]/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-[#D1BB90]" />
            Executive Recruiter Email
          </button>
          <button
            onClick={() => setChannel("sms")}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
              channel === "sms"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            Quick SMS / WhatsApp
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {channel !== "sms" && (
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#161E2B] border border-[#243144] focus:border-[#2BA8FF] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#2BA8FF]"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Message Body (Auto-Tailored to Matching Skills & C2C Terms)
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {body.length} characters
              </span>
            </div>
            <textarea
              rows={11}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-[#161E2B] border border-[#243144] focus:border-[#2BA8FF] rounded-lg p-3.5 text-xs text-slate-200 leading-relaxed font-mono focus:outline-none focus:ring-1 focus:ring-[#2BA8FF] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-[#1A2332] bg-[#161E2B]/50">
          <div className="text-xs text-slate-400">
            {candidate.profileUrl && (
              <a
                href={candidate.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#2BA8FF] hover:underline"
              >
                Open {candidate.fullName}&apos;s profile <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {channel === "email" && candidate.email && (
              <button
                onClick={handleMailTo}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-slate-200 hover:text-white bg-[#1E293B] hover:bg-[#2B394E] px-4 py-2 rounded-lg border border-[#2E3C50] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#2BA8FF]" />
                Open Default Mail App
              </button>
            )}

            <button
              onClick={handleCopy}
              className={`inline-flex items-center justify-center gap-2 text-xs font-bold px-5 py-2 rounded-lg transition-all ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-gradient-to-r from-[#D1BB90] to-[#E2D2B0] text-[#080B0E] hover:from-[#DFCDA7] hover:to-[#F1E3C5]"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Message
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
