import { useState, useEffect } from 'react'
import { Table } from 'antd'
import { getRoles } from './service'

function RoleList() {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState({ current: 1, pageSize: 10 })

  const getList = (newFilter) => {
    setFilter(newFilter)
    setLoading(true)
    getRoles(newFilter)
      .then((res) => {
        const { list, total } = res.data
        setList(list)
        setTotal(total)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getList(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onTableChange = (pagination) => {
    const { current, pageSize } = pagination
    getList({ current, pageSize })
  }

  const columns = [
    { title: '角色名称', dataIndex: 'name', width: '20%' },
    { title: '角色描述', dataIndex: 'desc' },
  ]

  const pagination = {
    ...filter,
    total,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  }

  return (
    <div>
      <Table
        rowKey='id'
        loading={loading}
        columns={columns}
        dataSource={list}
        pagination={pagination}
        onChange={onTableChange}
      />
    </div>
  )
}

export default RoleList
