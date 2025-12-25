/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        "app-bg": "#F8F9FA",
        "sidebar-bg": "#FFFFFF",
        "card-bg": "#FFFFFF",
        "header-bg": "#F9FAFB",
        primary: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
        },
        "text-primary": "#6598e0ff",
        "text-secondary": "#91CAFF",
        "text-muted": "#9CA3AF",
        "accent-gold": "#FCD34D",
        "accent-pink": "#EC4899",
        "accent-blue": "#60A5FA",
        "border-light": "#E5E7EB",
        "border-purple": "#DDD6FE",
      },

      fontFamily: {
        sans: [
          "Segoe UI",
          "-apple-system",
          "BlinkMacSystemFont",
          "Roboto",
          "sans-serif",
        ],
      },

      keyframes: {
        coinSpin: {
          "0%": { transform: "rotateY(0deg)" },
          "20%": { transform: "rotateY(720deg)" },
          "100%": { transform: "rotateY(720deg)" },
        },
      },

      animation: {
        "coin-spin": "coinSpin 4s ease-in-out infinite",
      },
    },
  },
};
