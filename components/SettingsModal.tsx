"use client";

import React, { useState, useEffect } from "react";
import { X, Key, ShieldCheck, Check, AlertCircle, Sparkles } from "lucide-react";
import { ApiConfiguration } from "@/lib/types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ApiConfiguration) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [serpApiKey, setSerpApiKey] = useState("");
  const [proxycurlApiKey, setProxycurlApiKey] = useState("");
  const [apolloApiKey, setApolloApiKey] = useState("");
  const [hunterApiKey, setHunterApiKey] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("talent_hunter_api_keys");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSerpApiKey(parsed.serpApiKey || "");
          setProxycurlApiKey(parsed.proxycurlApiKey || "");
          setApolloApiKey(parsed.apolloApiKey || "");
          setHunterApiKey(parsed.hunterApiKey || "");
        } catch {
          // ignore
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const config: ApiConfiguration = {
      serpApiKey: serpApiKey.trim() || undefined,
      proxycurlApiKey: proxycurlApiKey.trim() || undefined,
      apolloApiKey: apolloApiKey.trim() || undefined,
      hunterApiKey: hunterApiKey.trim() || undefined,
      useLiveApis: Boolean(serpApiKey || proxycurlApiKey || apolloApiKey || hunterApiKey),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("talent_hunter_api_keys", JSON.stringify(config));
    }

    onSave(config);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#0F141C] border border-[#243144] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2332] bg-[#161E2B]/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#2BA8FF]/10 border border-[#2BA8FF]/30 text-[#2BA8FF]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Sourcing & Enrichment API Integrations
              </h2>
              <p className="text-xs text-slate-400">
                Optional pluggable connectors for high-volume automated sourcing
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

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Zero-Cost Banner */}
          <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-emerald-300">
                Zero-Cost Native Sourcing Active
              </p>
              <p className="text-emerald-400/80 leading-relaxed">
                TalentHunter AI includes built-in Google X-Ray generation and candidate intelligence out of the box with zero external API fees ($0.00). Entering API keys below is completely optional.
              </p>
            </div>
          </div>

          {/* SerpAPI */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                SerpAPI Key (Optional)
              </label>
              <span className="text-[11px] text-slate-400">Automated Google search</span>
            </div>
            <input
              type="password"
              placeholder="e.g. 29a8f... (Optional)"
              value={serpApiKey}
              onChange={(e) => setSerpApiKey(e.target.value)}
              className="w-full bg-[#161E2B] border border-[#243144] focus:border-[#2BA8FF] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#2BA8FF]"
            />
          </div>

          {/* Proxycurl */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                Proxycurl API Key (Optional)
              </label>
              <span className="text-[11px] text-slate-400">Direct LinkedIn profile data</span>
            </div>
            <input
              type="password"
              placeholder="e.g. px_live_... (Optional)"
              value={proxycurlApiKey}
              onChange={(e) => setProxycurlApiKey(e.target.value)}
              className="w-full bg-[#161E2B] border border-[#243144] focus:border-[#2BA8FF] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#2BA8FF]"
            />
          </div>

          {/* Apollo.io */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                Apollo.io API Key (Optional)
              </label>
              <span className="text-[11px] text-slate-400">Verified emails & direct dials</span>
            </div>
            <input
              type="password"
              placeholder="e.g. apollo_api_key_... (Optional)"
              value={apolloApiKey}
              onChange={(e) => setApolloApiKey(e.target.value)}
              className="w-full bg-[#161E2B] border border-[#243144] focus:border-[#2BA8FF] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#2BA8FF]"
            />
          </div>

          {/* Hunter.io */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                Hunter.io API Key (Optional)
              </label>
              <span className="text-[11px] text-slate-400">Corporate email domain search</span>
            </div>
            <input
              type="password"
              placeholder="e.g. hunter_key_... (Optional)"
              value={hunterApiKey}
              onChange={(e) => setHunterApiKey(e.target.value)}
              className="w-full bg-[#161E2B] border border-[#243144] focus:border-[#2BA8FF] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#2BA8FF]"
            />
          </div>

          <div className="p-3 bg-[#161E2B] rounded-lg border border-[#222E40] text-[11px] text-slate-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#D1BB90] shrink-0" />
            <span>Keys are stored locally in your browser session and never sent to unauthorized servers.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1A2332] bg-[#161E2B]/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-[#1E293B] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-5 py-2 rounded-lg transition-all ${
              savedSuccess
                ? "bg-emerald-600 text-white"
                : "bg-gradient-to-r from-[#D1BB90] to-[#E2D2B0] text-[#080B0E] hover:from-[#DFCDA7] hover:to-[#F1E3C5]"
            }`}
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Settings Saved!
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Save & Apply Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
