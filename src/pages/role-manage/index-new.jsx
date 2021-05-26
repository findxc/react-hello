import { useState } from 'react'
import { Table, Button } from 'antd'
import EditRoleModal from './EditRoleModal'
import openModal from 'utils/openModal'
import useModal from 'utils/useModal'
import useQuery from 'utils/useQuery'

function RoleList() {
  const [filter, setFilter] = useState({ current: 1, pageSize: 10 })
  const { loading, data: roleListData } = useQuery('/api/roles', filter)
  const [editRoleModal, openEditRoleModal] = useModal(EditRoleModal)

  const onTableChange = (pagination) => {
    const { current, pageSize } = pagination
    setFilter({ current, pageSize })
  }

  const onEditRoleSuccess = (id) => {
    // 如果是编辑成功就刷新当前页面，否则回到第一页去
    if (id) {
      setFilter({ ...filter })
    } else {
      setFilter({ current: 1, pageSize: filter.pageSize })
    }
  }

  const onClickEdit = (detail) => {
    openModal(EditRoleModal, {
      detail,
      onOk: () => onEditRoleSuccess(detail.id),
    })
  }

  const onClickEdit2 = (detail) => {
    openEditRoleModal({
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
    total: roleListData?.total,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  }

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <Button type='primary' onClick={() => onClickEdit({})}>
          添加（使用 openModal）
        </Button>
        <Button type='primary' onClick={() => onClickEdit2({})}>
          添加（使用 useModal）
        </Button>
      </div>
      <Table
        rowKey='id'
        loading={loading}
        columns={columns}
        dataSource={roleListData?.list}
        pagination={pagination}
        onChange={onTableChange}
      />
      {editRoleModal}
    </>
  )
}

export default RoleList
