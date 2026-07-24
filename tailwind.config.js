/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          'green': '#00A651',
          'green-dark': '#16A34A',
          'green-deep': '#0E4B2E',
          'green-light': '#E1F5EE',
          'green-lighter': '#EAFAF0',
          'green-surface': '#EEF6F0',
          'off-white': '#FBFBFA',
          'bg-subtle': '#F5F7F3',
          'white': '#FFFFFF',
          'text-primary': '#1A1A1A',
          'text-secondary': '#4B5163',
          'text-muted': '#666666',
          'text-dark': '#14231A',
          'border': '#E6E6E6',
          'border-light': '#D1D5DB',
          'border-green': '#A9D9AE',
          'slate': '#334155',
          'slate-light': '#475569',
          'gray-mid': '#808285',
          'navy': '#161B2E',
        }
      },
    },
  },
  plugins: [],
};
