// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const webpack = require('webpack');

module.exports = {
  css: {
    extract: false, // false로 설정하면 CSS가 인라인으로 처리됩니다.
    sourceMap: true, // CSS 소스맵을 활성화하여 디버깅을 쉽게 합니다.
  },
  devServer: {
    port: 8082,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      fallback: {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "stream": require.resolve("stream-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "util": require.resolve("util/"),
        "assert": require.resolve("assert/"),
        "url": require.resolve("url/")
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  }

  // configureWebpack: {
  //   // Feature flags 설정
  //   define: {
  //     __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
  //     __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
  //   }
  // }

};
