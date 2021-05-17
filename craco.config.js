const CracoLessPlugin = require('craco-less')

const lessModifyVars = {
  '@primary-color': '#0097a7',
}

module.exports = {
  plugins: [
    // 对于 xxx.less 只需要配置 less loader
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: lessModifyVars,
            javascriptEnabled: true,
          },
        },
        modifyLessRule: function (lessRule, _context) {
          lessRule.test = /\.less$/
          lessRule.exclude = /\.module\.less$/
          return lessRule
        },
      },
    },
    // 对于 xxx.module.less 的样式还需要配置 css loader
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: lessModifyVars,
            javascriptEnabled: true,
          },
        },
        modifyLessRule: function (lessRule, _context) {
          lessRule.test = /\.module\.less$/
          lessRule.exclude = undefined
          return lessRule
        },
        cssLoaderOptions: {
          modules: { localIdentName: '[local]_[hash:base64:5]' },
        },
      },
    },
  ],
}
