/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      container: {
        center: true,
      },
      screens: {
        sm: '540px',

        md: '720px',

        lg: '960px',

        xl: '1140px',

        '2xl': '1320px',
      },
    },
  },
  plugins: [],
};
