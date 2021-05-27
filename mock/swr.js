const { mock } = require('mockjs')

const total = 24
const tagList = mock({
  [`list|${total}`]: [
    {
      'id|+1': 1,
      name: '@ctitle',
      color: '@color',
    },
  ],
}).list

const mockGetTags = (req, res) => {
  const { current, pageSize } = req.query
  res.send({
    total,
    list: tagList.slice((current - 1) * pageSize, current * pageSize),
  })
}

module.exports = {
  'GET /api/a/tags': mockGetTags,
  'GET /api/b/tags': mockGetTags,
  'GET /api/c/tags': mockGetTags,
}
