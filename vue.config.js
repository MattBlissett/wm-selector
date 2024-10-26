process.env.VUE_APP_VERSION = process.env.npm_package_version

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/scss/baseline.scss";'
      }
    }
  }
};
