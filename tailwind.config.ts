import type { Config } from "tailwindcss";

/**
 * Tokens aligned to the Open / Open.money design-system reference
 * (Design System Reference [For Intern].fig — Style Guide: Colour & Graphics).
 *
 * Pure-black background, near-black surfaces, brand gold accent, and a hotter
 * orange used for "missed value" emphasis (mirrors the system's savings motif).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core semantics
        background: "#000000",
        foreground: "#FFFFFF", // primary text
        muted: "#B8B8B8", // secondary text
        subtle: "#7A7A7A", // captions, hints, faint text

        surface: "#1B1B1A",
        surfaceRaised: "#211F1C",
        surfaceWarm: "#24231F",
        surfaceMuted: "#121211",
        surfaceError: "#380314",

        border: "#383C3F",
        borderWarm: "rgba(242, 172, 89, 0.18)",
        borderHighlight: "#F2AC59",

        // Brand / accent
        primary: "#F2AC59",
        primaryMuted: "#5A4326",
        accent: "#F2AC59", // alias of primary (brand gold)
        accentHover: "#F6BD73", // brighter gold for hover
        emphasis: "#FD6422", // hot orange — "missed / net benefit" motif

        brand: {
          200: "#F7C380",
          300: "#F3B567",
          400: "#EB9C52",
          500: "#F2AC59",
          600: "#DB9C32",
          700: "#B57A1E",
          800: "#5A4326",
        },

        // Status palette
        success: "#F2AC59",
        warning: "#DA724F",
        alert: "#FD6422",
        destructive: "#E83C79",
      },
      borderRadius: {
        lg: "0.625rem",
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        caption: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
