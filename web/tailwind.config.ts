import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      joyFont: ["joyFont", "sans-serif"],
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
        "joy-green": "#15BB44",
        "joy-green-l": "#F1FFF5",
        "joy-black": "#000000",
        "joy-white": "#ffffff",
      },
    },
  },
  plugins: [],
} satisfies Config;
