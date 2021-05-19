import { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import EditRoleModal from './EditRoleModal'
import openModal from 'utils/openModal'
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

  const onEditRoleSuccess = (id) => {
    // 如果是编辑成功就刷新当前页面，否则回到第一页去
    if (id) {
      getList({ ...filter })
    } else {
      getList({ current: 1, pageSize: filter.pageSize })
    }
  }

  const onClickEdit = (detail) => {
    openModal(EditRoleModal, {
      detail,
      onOk: () => onEditRoleSuccess(detail.id),
    })
  }

  const columns = [
    { title: '角色名称', dataIndex: 'name', width: '20%' },
    { title: '角色描述', dataIndex: 'desc' },
    {
      title: '操作',
      dataIndex: 'id',
      align: 'center',
      render: (id, record) => {
        return (
          <Button type='link' onClick={() => onClickEdit(record)}>
            编辑
          </Button>
        )
      },
    },
  ]

  const pagination = {
    ...filter,
    total,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  }

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <Button type='primary' onClick={() => onClickEdit({})}>
          添加
        </Button>
      </div>
      <Table
        rowKey='id'
        loading={loading}
        columns={columns}
        dataSource={list}
        pagination={pagination}
        onChange={onTableChange}
      />
    </>
  )
}

export default RoleList
