const { defineConfig } = require('@vue/cli-service')
const registerRouter = require('./backend/router')
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
          @import "@/assets/scss/base.scss";
        `
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    onBeforeSetupMiddleware(devServer) {
      registerRouter(devServer.app)
    }
  },
  chainWebpack: (config) => {
      config.plugin("define").tap((args) => {
          args[0]["process"] = {...args[0]["process.env"]}
            return args;
        })
    }
})
