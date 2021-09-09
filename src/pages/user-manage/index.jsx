import { useState } from 'react'
import { Table, Popconfirm, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import useQuery from 'utils/useQuery'
import EditModal from './components/EditModal'
import { deleteUser } from './service'

function UserList() {
  const [filter, setFilter] = useState({ current: 1, pageSize: 10 })
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { data, loading } = useQuery('/api/users', filter)

  const [modalDetail, setModalDetail] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

  const history = useHistory()

  const onTableChange = (pagination) => {
    const { current, pageSize } = pagination
    setFilter({ current, pageSize })
  }

  const onClickEdit = (detail) => {
    setModalDetail(detail)
    setModalVisible(true)
  }

  const onConfirmDelete = (id) => {
    setDeleteLoading(true)
    deleteUser(id)
      .then(() => {
        // 如果当前页只有一条数据，就删除后回到上一页，否则停留当前页
        if (data?.list?.length === 1 && filter.pageNo > 1) {
          filter.pageNo--
        }
        setFilter({ ...filter })
        setDeleteLoading(false)
      })
      .catch(() => {
        setDeleteLoading(false)
      })
  }

  const onEditSuccess = () => {
    setModalVisible(false)
    // 是修改就刷新当前页面，是添加就到第一页去
    if (modalDetail.id) {
      setFilter({ ...filter })
    } else {
      setFilter({ ...filter, current: 1 })
    }
  }

  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '角色', dataIndex: 'roleName' },
    { title: '行业', dataIndex: 'industryName' },
    {
      title: '操作',
      dataIndex: 'id',
      align: 'center',
      render: (id, record) => {
        return (
          <>
            <Button
              type='link'
              size='small'
              style={{ marginRight: 8 }}
              onClick={() => onClickEdit(record)}
            >
              修改
            </Button>
            <Popconfirm
              title='确认删除吗?'
              onConfirm={() => onConfirmDelete(id)}
            >
              <Button type='link' size='small' danger>
                删除
              </Button>
            </Popconfirm>
          </>
        )
      },
    },
  ]

  const pagination = {
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (t) => `共${t}条`,
    total: data?.total,
    current: filter.current,
    pageSize: filter.pageSize,
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Button type='primary' onClick={() => onClickEdit({})}>
          添加
        </Button>
        <Button
          style={{ marginLeft: 24 }}
          onClick={() => history.push('/user/detail')}
        >
          查看详情
        </Button>
      </div>
      <Table
        rowKey='id'
        loading={loading || deleteLoading}
        columns={columns}
        pagination={pagination}
        dataSource={data?.list}
        onChange={onTableChange}
      />
      <EditModal
        detail={modalDetail}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={onEditSuccess}
      />
    </div>
  )
}

export default UserList
