const { mock } = require('mockjs')

module.exports = {
  'GET /api/stat/week': (req, res) => {
    res.send(
      mock({
        'data1|7': ['@integer(100, 300)'],
        'data2|7': ['@integer(100, 500)'],
      })
    )
  },
}
