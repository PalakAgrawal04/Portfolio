module.exports = {
  content: [
    "./src/app/*/.{js,ts,jsx,tsx}",
    "./src/components/*/.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5A2B',
        'primary-light': '#A67C52',
        'primary-dark': '#6A4320',
        secondary: '#F5F5F0',
        'secondary-dark': '#E5E5E0',
        accent: '#4A5568',
        'accent-light': '#718096',
      },
    },
  },
  plugins: [],
};