export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#334155',
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
