module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["_src/**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
