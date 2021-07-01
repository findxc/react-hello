const { mock } = require('mockjs')

module.exports = {
  'GET /api/roles': (req, res) => {
    res.send(
      mock({
        total: 52,
        [`list|${req.query.pageSize}`]: [
          {
            'id|+1': 1,
            name: '@ctitle',
            desc: '@cparagraph',
          },
        ],
      })
    )
  },

  'GET /api/roles/all': (req, res) => {
    const data = mock({
      [`list|12`]: [
        {
          'id|+1': 1,
          name: '@ctitle',
        },
      ],
    })
    res.send(data.list)
  },

  'POST /api/role': (req, res) => {
    res.send({ ok: true })
  },

  'PUT /api/role/:id': (req, res) => {
    res.send({ ok: true })
  },
}
