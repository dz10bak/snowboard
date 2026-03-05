/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forge: {
          950: '#060a12',
          900: '#0a0e17',
          800: '#111827',
          700: '#1e293b',
          600: '#334155',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
        },
        accent: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          purple: '#8b5cf6',
        },
        snow: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
