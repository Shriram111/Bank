/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F0F9',
          100: '#B3D1ED',
          200: '#80B3E1',
          300: '#4D94D5',
          400: '#1A76C9',
          500: '#004C8C',
          600: '#003D70',
          700: '#002E54',
          800: '#001F38',
          900: '#000F1C',
        },
        secondary: {
          50: '#FDEAED',
          100: '#F9C5CE',
          200: '#F49EAB',
          300: '#EF7788',
          400: '#EA5065',
          500: '#E31837',
          600: '#B6132C',
          700: '#880E21',
          800: '#5B0916',
          900: '#2D050B',
        },
        accent: {
          50: '#E6F5EF',
          100: '#B3E2D1',
          200: '#80CFB3',
          300: '#4DBC95',
          400: '#1AAA77',
          500: '#00A86B',
          600: '#008656',
          700: '#006540',
          800: '#00432B',
          900: '#002215',
        },
        dark: {
          50: '#E8EAED',
          100: '#C5C9D0',
          200: '#9FA5B0',
          300: '#798190',
          400: '#535D70',
          500: '#101828',
          600: '#0E1521',
          700: '#0B111A',
          800: '#080D13',
          900: '#04060A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'banking': '0 25px 50px -12px rgba(0, 76, 140, 0.25)',
      },
    },
  },
  plugins: [],
}
