const path = require("path");

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/less/reset.less'),
        path.resolve(__dirname, 'src/assets/less/_variable.less'),
        path.resolve(__dirname, 'src/assets/less/_font.less'),
        path.resolve(__dirname, 'src/assets/less/main.less'),
      ]
    }
  }
};
