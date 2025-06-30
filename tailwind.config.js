/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        mint: {
          50: '#f0f9f4',
          100: '#dcf1e5',
          200: '#bae3cd',
          300: '#8fcbad',
          400: '#57ac85',
          500: '#3a9069',
          600: '#2a7555',
          700: '#246047',
          800: '#1e4d3b',
          900: '#1a4031',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'Segoe UI', 'system-ui', 'sans-serif'],
        serif: ['Nunito', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'breathe': 'breathe 5s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slideInRight': 'slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slideInLeft': 'slideInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'spin-slow': 'spin 4s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.6)',
        'inner-glow': 'inset 0 0 20px rgba(139, 92, 246, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
};