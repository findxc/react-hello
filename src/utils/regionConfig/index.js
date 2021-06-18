// 当前路径下所有 .js 和 .ts 文件，不遍历子目录，不包含 index 和 index.old
const ctx = require.context('./', false, /(?<!index(\.old)?)\.[tj]s$/)

// ["./chongqing.js", "./sichuan.js", "./xxx.js"]
const ctxKeys = ctx.keys()

// {chongqing: {}, sichuan: {}, xxx: {}} 这种格式
const regionConfig = ctxKeys.reduce((total, path) => {
  const filename = path.match(/[a-z-_]+/i)[0]
  console.log(path, ctx(path).default)
  total[filename] = ctx(path).default
  return total
}, {})

export default regionConfig
