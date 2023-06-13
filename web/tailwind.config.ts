import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      safarFont: ["safarFont", "sans-serif"],
    },
    screens: {
      xs: "0px",
      mb: "400px",
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1920px",
    },
    extend: {
      colors: {
        "safar-orange": "#FF8B00",
        "safar-orange-l": "#FFE0BA",
        "safar-black": "#000000",
        "safar-white": "#ffffff",
      },
    },
  },
  plugins: [],
} satisfies Config;
