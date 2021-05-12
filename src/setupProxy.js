const path = require('path')
const fs = require('fs')
const apiMocker = require('mocker-api')
const delay = require('mocker-api/lib/delay')

// 解析得到 dirPath 下所有文件的路径
const parseAllFilePaths = (dirPath) => {
  return fs.readdirSync(dirPath).reduce((total, current) => {
    const currentPath = path.join(dirPath, current)
    const stat = fs.statSync(currentPath)
    if (stat.isDirectory()) {
      return total.concat(parseAllFilePaths(currentPath))
    }
    return total.concat(currentPath)
  }, [])
}

const runMockServer = (app) => {
  const mockDirPath = path.resolve(__dirname, '../mock')
  const allMockFilePaths = parseAllFilePaths(mockDirPath)
  const mockObj = allMockFilePaths.reduce((total, current) => {
    const api = require(current)
    Object.assign(total, api)
    return total
  }, {})
  apiMocker(app, delay(mockObj, 500))
}

module.exports = function (app) {
  if (process.env.API_ENV === 'mock') {
    runMockServer(app)
  }
}
