module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dice-game/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                    @import "@/styles/main.scss";
                `
      }
    }
  }
};
