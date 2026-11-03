/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#61DBFB',
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        display: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        rise: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pop: { from: { opacity: '0', transform: 'scale(0.96) translateY(8px)' }, to: { opacity: '1', transform: 'scale(1) translateY(0)' } },
        bars: { '0%, 100%': { transform: 'scaleY(0.25)' }, '50%': { transform: 'scaleY(1)' } },
        unlock: { from: { transform: 'translateY(var(--drag, 0px))', opacity: '1' }, to: { transform: 'translateY(-100%)', opacity: '0' } },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-in',
        rise: 'rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        pop: 'pop 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
        bars: 'bars 0.9s ease-in-out infinite',
        unlock: 'unlock 0.7s cubic-bezier(0.7, 0, 0.2, 1) forwards',
      },
    },
  },
  plugins: [],
};
