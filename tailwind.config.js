module.exports = {
  content: ['./src/**/*.{html,js,jsx,tsx,ts}', './ones-ai-web-common/**/*.{js,jsx,tsx,ts}'],
  presets: [require('@ones-design/tailwind-preset')],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
