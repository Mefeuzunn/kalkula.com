/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Renk paleti 1: Odak ve Güven
        background: "#F8FAFC",
        primary: "#0EA5E9",
        secondary: "#10B981",
        text: "#0F172A",
        // Renk paleti 2: Gece Mesaisi
        dark: {
          background: "#121212",
          surface: "#1E1E1E",
          primary: "#F59E0B",
          text: "#E5E7EB",
        }
      }
    },
  },
  plugins: [],
}
