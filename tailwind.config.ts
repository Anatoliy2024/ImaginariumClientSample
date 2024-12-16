import type { Config } from "tailwindcss"

const config: Config = {
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
      boxShadow: {
        "custom-10": "0 0 10px 10px  rgb(59, 200, 0)", // Настраиваемая тень
        "custom-1": "0 0 10px 10px  rgb(235, 255, 181)", // Настраиваемая тень
      },
      flex: {
        chat: "1 0 280px",
        game: "1 0 52%",
        // game2: "1 0 60%",
        map: "1 0 300px",
      },
    },
  },
  plugins: [],
}
export default config
