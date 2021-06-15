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
        DEFAULT: '#FFFFFF',
      },
      primary: {
        dark: '#f93934',
        DEFAULT: '#F94943',
      },
      gray: {
        DEFAULT: '#080808',
        light: '#545454',
      },
      light_gray: {
        DEFAULT: '#C8C8C8',
        light: '#545454',
      },
      moderngrey: {
        DEFAULT: '#131313'
      },
      black: {
        DEFAULT: '#000000'
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
