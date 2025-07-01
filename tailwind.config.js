/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f0fe',
          100: '#d2e3fc',
          200: '#aecbfa',
          300: '#8ab4f8',
          400: '#669df6',
          500: '#1a73e8',
          600: '#1557b0',
          700: '#0f3f78',
          800: '#0a2954',
          900: '#051330'
        },
        success: {
          50: '#e6f4ea',
          100: '#ceead6',
          200: '#a8dab5',
          300: '#81c995',
          400: '#5bb974',
          500: '#34a853',
          600: '#2d8e47',
          700: '#26743a',
          800: '#1f5a2e',
          900: '#184021'
        },
        warning: {
          50: '#fef7e0',
          100: '#feefc3',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#fbbc04',
          600: '#d69e2e',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ea4335',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#4285f4',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#5f6368',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        },
        surface: '#ffffff',
        background: '#f8f9fa'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'button': '0 1px 3px rgba(0, 0, 0, 0.12)',
        'button-hover': '0 2px 6px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideUp': 'slideUp 0.3s ease-out',
        'pulse-star': 'pulse-star 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-star': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}