/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          dark: '#1E40AF',
          light: '#3B82F6',
        },
        accent: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
        },
        background: '#F9FAFB',
        text: '#2E2E2E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
