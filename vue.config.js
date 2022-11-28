const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://toutiao.itheima.net',
        pathRewrite: { '^/api': '' },
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === "production" ? 'false' : 'source-map',
  }
})
