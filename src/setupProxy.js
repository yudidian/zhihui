const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:7100',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
