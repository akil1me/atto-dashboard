/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#33357F",
        green: "#27AC5FFF",
      },
    },
  },
  plugins: [],
};
