/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          foreground: "#f8f8f2",
          background: "#282a36",
        }
      }
    },
  },
  plugins: [],
};
