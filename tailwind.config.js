/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:        '#F9FAFB',  // cool white   — page background only
          section:   '#F1F3F5',  // light cool gray — alternate section backgrounds only
          card:      '#E9ECEF',  // cool gray    — card fills only
          gold:      '#C07878',  // rose         — buttons + key highlights
          goldLight: '#DBA8A0',  // rose light   — gradient end stop (#C07878 → #DBA8A0)
          blush:     '#D4A8A0',  // muted rose   — dots · separators · avatar bg · stars
          heading:   '#2D3442',  // dark slate   — all headings + nav links
          text:      '#5A6578',  // slate gray   — all body text + descriptions
          label:     '#9CA3AF',  // neutral gray — labels · placeholders · secondary info
          dark:      '#1A2030',  // blue-black   — footer + dark feature sections only
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
