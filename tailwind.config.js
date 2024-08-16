/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      backdropBlur: {
        'sm': '4px',  // Small blur
        'md': '8px',  // Medium blur
        'lg': '12px', // Large blur
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.backdrop-blur-sm': {
            'backdrop-filter': 'blur(4px)',
          },
          '.backdrop-blur-md': {
            'backdrop-filter': 'blur(8px)',
          },
          '.backdrop-blur-lg': {
            'backdrop-filter': 'blur(12px)',
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
}