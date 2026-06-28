/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        DEFAULT: ['Roboto-Regular'],
        thin: ['Roboto-Thin'],
        extralight: ['Roboto-ExtraLight'],
        light: ['Roboto-Light'],
        regular: ['Roboto-Regular'],
        medium: ['Roboto-Medium'],
        semibold: ['Roboto-SemiBold'],
        bold: ['Roboto-Bold'],
        extrabold: ['Roboto-ExtraBold'],
      }
    },
  },
  plugins: [],
}

