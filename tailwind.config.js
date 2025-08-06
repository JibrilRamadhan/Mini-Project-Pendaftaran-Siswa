/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
            50: '#f0f4ff',
            500: '#667eea',
            600: '#5a67d8',
            700: '#4c51bf'
        }
    }
    },
  },
  plugins: [],
}
