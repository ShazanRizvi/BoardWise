/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#d3bdfd',  // Very light shade of primary
          DEFAULT: '#8b5cf6', // Original primary color
          dark: '#6b21a8',    // Darker shade of primary
          50: '#f5f3ff',      // Lightest shade
          100: '#ede9fe',     // Very light shade
          200: '#ddd6fe',     // Lighter
          300: '#c4b5fd',     // Light
          400: '#a78bfa',     // Slightly lighter
          500: '#8b5cf6',     // Default
          600: '#7c3aed',     // Darker
          700: '#6d28d9',     // Even darker
          800: '#5b21b6',     // Darker still
          900: '#4c1d95',
        },
        secondary: {
          light: '#fda4d4',  // Light shade of secondary
          DEFAULT: '#db2777', // Original secondary color
          dark: '#9d174d',    // Darker shade of secondary
          50: '#fdf2f8',      // Lightest shade
          100: '#fce7f3',     // Very light
          200: '#fbcfe8',     // Lighter
          300: '#f9a8d4',     // Light
          400: '#f472b6',     // Slightly lighter
          500: '#db2777',     // Default
          600: '#be185d',     // Darker
          700: '#9d174d',     // Even darker
          800: '#831843',     // Darker still
          900: '#701a3f',   
        },
        accent: '#f5f3ff',      // Accent color
        muted: '#6B7280',       // Muted grey color
        background: '#F3F4F6',  // Background color
        foreground: '#111827',  // Foreground text color
      },
    },
  },
  plugins: [],
};
