// tailwind.config.js

module.exports = {
  darkMode: "class", // Ensure dark mode is enabled using class strategy
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ['"Playfair Display"', "serif"],
      },
      colors: {
        gold: "#D4AF37",
        "dark-gray": "#1a1a1a", // Darker shade for better contrast
      },
    },
  },
  plugins: [],
};
