const webpack = require('webpack');

module.exports = {
  devServer: {
    proxy: {
      '/api-shop': {  // Изменяем ключ проксирования
        target: 'http://lifestealer86.ru',
        changeOrigin: true,
        pathRewrite: {
          '^/api-shop': '/api-shop'  // Сохраняем оригинальный путь
        },
        logLevel: 'debug'
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // Установка флагов функций
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true), // или false
      }),
    ],
  },
};
