const { mock } = require('mockjs')

module.exports = {
  'GET /api/users': (req, res) => {
    res.send(
      mock({
        total: '@integer(10, 50)',
        'list|10': [
          {
            'id|+1': 1,
            name: '@cname',
            age: '@integer(10, 50)',
          },
        ],
      })
    )
  },
}
