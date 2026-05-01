/** @type {import('tailwindcss').Config} */
//
// Kit design tokens — sourced from the Figma community kit at /figma-9-screens.
// The kit's visual vocabulary is pastel sky-cream-yellow gradients, generous
// rounded corners (24-36px), heavy bold typography, and soft elevated shadows.
//
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Existing palette
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

        // Kit-specific accents (lifted from the Figma export)
        'kit-eyebrow': '#49636d',         // dim teal used for eyebrow / metadata copy
        'kit-sky-1':   '#96cdf5',         // gradient stop A (sky blue)
        'kit-sky-2':   '#d7efff',         // gradient stop A soft variant
        'kit-cream-1': '#fef5df',         // gradient stop B (warm cream)
        'kit-cream-2': '#fff7dd',         // gradient stop B soft variant
        'kit-gold-1':  '#ffda59',         // gradient stop C (saturated gold)
        'kit-gold-2':  '#ffd85b',         // gradient stop C alt
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"IBM Plex Sans Thai"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // Kit gradient palette — use as `bg-kit-sky`, `bg-kit-sky-soft`, etc.
        'kit-sky':         'linear-gradient(135deg, #96cdf5 0%, #fef5df 42%, #ffda59 100%)',
        'kit-sky-soft':    'linear-gradient(135deg, #d7efff 0%, #fff7dd 46%, #ffd85b 100%)',
        'kit-cream-gold':  'linear-gradient(135deg, #fef5df 0%, #ffda59 100%)',
        'kit-overlay-dark': 'linear-gradient(to top, rgba(3,29,44,0.72), transparent 58%)',
      },
      boxShadow: {
        // Existing
        soft:  '0 24px 60px rgba(25, 73, 120, 0.22)',
        sheet: '0 -4px 30px rgba(20, 45, 65, 0.14)',
        // Kit-specific elevations
        'kit-frame': '0 28px 80px rgba(32, 75, 111, 0.24)',  // phone frame / hero card
        'kit-card':  '0 12px 32px rgba(45, 101, 150, 0.12)', // photo cards
        'kit-pill':  '0 8px 28px rgba(25, 73, 120, 0.09)',   // search/chatbot pill
      },
      borderRadius: {
        // Kit-specific corner radii
        'kit-hero':  '28px', // hero cards, theme strip, large surfaces
        'kit-photo': '22px', // photo cards, browse list cards
        'kit-frame': '36px', // phone frame
        'kit-pill':  '999px',
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
    },
  },
  plugins: [],
}
