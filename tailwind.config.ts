import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "home-bg": "url('/images/home-bg.jpg')",
      }),
      fontFamily: {
        "pixel-font": ['"Press Start 2P"', "cursive"],
        mono: ["var(--font-roboto-mono)"],
      },
      colors: {
        primary: colors.violet,
      },
    },
  },
  plugins: [],
};
export default config;
