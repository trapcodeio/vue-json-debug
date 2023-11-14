/** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors');

module.exports = {
    prefix: 'vjd-',
  content: [
      "./src/components/debug/Debug.vue",
      "./src/components/debug/DebugDock.vue",
      "./src/components/debug/docks/RouterInfo.vue",
      "./src/components/debug/docks/ScreenSize.vue"
  ],
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
