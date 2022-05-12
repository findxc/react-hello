const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  if (process.env.API_ENV === 'mock') {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:5050',
      })
    )
  }
}
