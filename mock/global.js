const { mock } = require('mockjs')

module.exports = {
  'GET /api/current-user': (req, res) => {
    res.send(
      mock({
        username: '@string(6,12)',
      })
    )
  },
}
