const path = require('path')
const fs = require('fs')
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

// 过滤掉 mock/index.js
const allFilePaths = parseAllFilePaths(path.resolve(__dirname, './')).filter(
  (p) => !p.endsWith('mock/index.js')
)

// 把所有文件的内容合并
const allMockData = allFilePaths.reduce((total, current) => {
  return Object.assign(total, require(current))
}, {})

// 加上 delay
module.exports = delay(allMockData, 500)
