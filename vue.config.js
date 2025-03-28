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
    }
  }
