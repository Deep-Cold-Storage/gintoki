module.exports = {
  purge: ['./src/**/*.{vue,js}'],
  darkMode: false,

  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#F3F3F4',
      },
      background: {
        DEFAULT: '#F2EFE7',
      },
      primary: {
        dark: '#f93934',
        DEFAULT: '#F94943',
      },
      gray: {
        DEFAULT: '#080808',
        light: '#545454',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Poppins', 'sans-serif'],
    },
    extend: {
      screens: {
        '3xl': '2000px',
      },
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(['disabled']),
    textColor: ({ after }) => after(['disabled']),
  },
  plugins: [],
};
