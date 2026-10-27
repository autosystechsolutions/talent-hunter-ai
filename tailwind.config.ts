import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080B0E",
        surface: "#0F141C",
        panel: "#161E2B",
        electric: "#D1BB90",
        cyber: "#2BA8FF",
        emeraldPulse: "#10B981",
        amberPulse: "#F59E0B",
      },
    },
  },
  plugins: [],
} satisfies Config;
