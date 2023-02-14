/** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/components/debug/Debug.vue"],
  theme: {
    extend: {
      colors: {
        // stone: colors.stone,
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
