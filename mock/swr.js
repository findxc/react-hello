const { mock } = require('mockjs')

const mockGetTags = (req, res) => {
  res.send(
    mock({
      total: 24,
      [`list|${req.query.pageSize}`]: [
        {
          'id|+1': 1,
          name: '@ctitle',
          color: '@color',
        },
      ],
    })
  )
}

module.exports = {
  'GET /api/a/tags': mockGetTags,
  'GET /api/b/tags': mockGetTags,
}
