module.exports = {
  plugins: {
    "postcss-preset-env": {
      stage: 3,
      autoprefixer: { grid: true },
    },
    cssnano: {},
  },
};
