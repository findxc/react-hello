const path = require('path')
const apiMocker = require('mocker-api')

module.exports = function (app) {
  if (process.env.API_ENV === 'mock') {
    apiMocker(app, path.resolve(__dirname, '../mock/index.js'))
  }
}
