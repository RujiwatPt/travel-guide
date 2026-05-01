/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#061c22',
        muted: '#6b7188',
        'blue-soft': '#88c7f4',
        'blue-strong': '#1e8df0',
        yellow: '#ffc20d',
        cream: '#fff6dc',
        panel: '#f8fbff',
        'status-open': '#2ea84a',
        'status-closing': '#ffc20d',
        'status-closed': '#9ca3af',
        'status-temp-closed': '#b16060',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"IBM Plex Sans Thai"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 60px rgba(25, 73, 120, 0.22)',
        sheet: '0 -4px 30px rgba(20, 45, 65, 0.14)',
      },
    },
  },
  plugins: [],
}
