const { mock } = require('mockjs')

module.exports = {
  'GET /api/roles': (req, res) => {
    res.send(
      mock({
        total: '@integer(10, 50)',
        'list|10': [
          {
            'id|+1': 1,
            name: '@ctitle',
          },
        ],
      })
    )
  },
}
