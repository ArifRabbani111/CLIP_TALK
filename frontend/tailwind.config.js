module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Letterboxd-inspired colors
        'letterboxd': '#14181c',      // Dark background
        'letterboxd-light': '#1f2937', // Lighter dark for cards
        'letterboxd-accent': '#00e054', // Bright green accent
        'letterboxd-accent-hover': '#00c248', // Darker green for hover
        'letterboxd-text': '#9ca3af', // Light gray text
        'letterboxd-text-bright': '#f3f4f6', // Bright white text
        'letterboxd-border': '#374151', // Border color
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
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
      },
    },
  },
  plugins: [],
}