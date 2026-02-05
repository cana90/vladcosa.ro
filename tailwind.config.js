/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Muted, earthy palette for a calm, professional psychology office
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7cfc7',
          300: '#a3b0a3',
          400: '#7d8d7d',
          500: '#5f6f5f',
          600: '#4a594a',
          700: '#3d473d',
          800: '#333b33',
          900: '#2c322c',
        },
        cream: {
          50: '#fdfdfb',
          100: '#f9f8f4',
          200: '#f3f1e9',
          300: '#ebe7d9',
          400: '#ddd7c3',
          500: '#cbc3a8',
          600: '#b5aa8e',
          700: '#9a8e75',
          800: '#7e7461',
          900: '#675f50',
        },
        slate: {
          50: '#f8f9fa',
          100: '#eef0f2',
          200: '#d9dde2',
          300: '#b8c0c8',
          400: '#919da8',
          500: '#6f7d8c',
          600: '#596673',
          700: '#4a535e',
          800: '#3f464f',
          900: '#373d44',
        },
      },
      fontFamily: {
        serif: ['Crimson Pro', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
