/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f1426",
        foreground: "#171f32",
        text: '#e2e4ec',
        border: '#3498db59'
      }
    },
  },
  plugins: [],
};
