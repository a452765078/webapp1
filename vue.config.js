const { defineConfig } = require('@vue/cli-service')
const registerRouter = require('./backend/router')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const TerserPlugin = require('terser-webpack-plugin');
const isDevlopment = process.env.NODE_ENV === 'development';
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

      
    // npm run build --report 时才开启
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin) // 分析项目文件大小的插件
      }

    // 生产环境下
    if (!isDevlopment) {
      return {
          optimization: {
            minimizer: [
              new TerserPlugin({
                sourceMap: false,
                terserOptions: {
                  compress: {
                    drop_console: true // 生产环境下清除 console.log
                  }
                }
              })
            ]
          }
        }
      }
    //
    }
})




