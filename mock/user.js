const { mock } = require('mockjs')

const flatten = (list) => {
  return (list || []).reduce((total, current) => {
    const { id, name, children } = current
    total.push({ id, name })
    if (children && children.length) {
      total.push(...flatten(children))
    }
    return total
  }, [])
}

const industrys = [
  {
    id: 1,
    name: '行业1',
    children: [
      { id: 11, name: '行业1-111' },
      { id: 12, name: '行业1-222' },
    ],
  },
  {
    id: 2,
    name: '行业2',
    children: [
      { id: 21, name: '行业2-111' },
      { id: 22, name: '行业2-222' },
    ],
  },
]
const industryIdToName = flatten(industrys).reduce((total, current) => {
  const { id, name } = current
  total[id] = name
  return total
}, {})

module.exports = {
  'GET /api/industrys': (req, res) => {
    res.send(industrys)
  },

  'GET /api/users': (req, res) => {
    // res.status (401).send('未登录')
    const data = mock({
      total: '@integer(10, 50)',
      'list|10': [
        {
          'id|+1': 1,
          name: '@cname',
          'industry|1': [1, 11, 12, 2, 21, 22],
          role: '@integer(1,10)',
          roleName: '@ctitle',
        },
      ],
    })
    data.list.forEach((item) => {
      item.industryName = industryIdToName[item.industry]
    })
    res.send(data)
  },

  'POST /api/user': (req, res) => {
    res.send({ ok: true })
  },

  'PUT /api/user/:id': (req, res) => {
    res.send({ ok: true })
  },

  'DELETE /api/user/:id': (req, res) => {
    res.send({ ok: true })
  },
}
