import type { Config } from "tailwindcss";

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
      },
    },
  },
  plugins: [],
};
export default config;
