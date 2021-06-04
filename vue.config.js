const path = require("path");

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/scss/reset.less'),
        path.resolve(__dirname, 'src/assets/scss/_variable.less'),
        path.resolve(__dirname, 'src/assets/scss/_font.less'),
        path.resolve(__dirname, 'src/assets/scss/main.less'),
      ]
    }
  }
};
