import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoSys TalentHunter AI | Autonomous Automotive & Embedded Sourcing Engine",
  description: "Next-gen candidate discovery, boolean X-Ray sourcing, and recruiter outreach engine for automotive, EV, firmware, DSP, and systems engineers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#080B0E] text-[#F0F5FA] antialiased selection:bg-[#2BA8FF]/20 selection:text-[#2BA8FF]">
        {children}
      </body>
    </html>
  );
}
