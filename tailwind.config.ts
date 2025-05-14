import { withUt } from "uploadthing/tw";

export default withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        "source-code-pro-bold": ["SourceCodePro-Bold"],
        "source-code-pro-medium": ["SourceCodePro-Medium"],
        "source-code-pro-regular": ["SourceCodePro-Regular"],
        "source-code-pro-semibold": ["SourceCodePro-SemiBold"],
        "noto-serif-bold": ["NotoSerif-Bold"],
        "noto-serif-medium": ["NotoSerif-Medium"],
        "noto-serif-regular": ["NotoSerif-Regular"],
        "noto-serif-semibold": ["NotoSerif-SemiBold"],
        "inter-18pt-bold": ["Inter_18pt-Bold"],
        "inter-18pt-medium": ["Inter_18pt-Medium"],
        "inter-18pt-regular": ["Inter_18pt-Regular"],
        "inter-18pt-semibold": ["Inter_18pt-SemiBold"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
});
