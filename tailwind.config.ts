import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // 👇 INI YANG HILANG: Konfigurasi Font agar sama dengan CSS
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
      },
    },
  },
  // 👇 INI JUGA HILANG: Plugin untuk merapikan artikel blog (prose)
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;