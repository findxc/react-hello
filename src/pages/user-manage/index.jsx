import { useState, useMemo } from 'react'
import {
  Table,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
  Select,
  TreeSelect,
} from 'antd'
import useQuery from 'utils/useQuery'
import { deleteUser, addUser, updateUser } from './service'

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
}

function UserList() {
  const [filter, setFilter] = useState({ current: 1, pageSize: 10 })
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { data, loading } = useQuery('/api/users', filter)

  const [modalDetail, setModalDetail] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [form] = Form.useForm()

  const { data: allRoles } = useQuery('/api/roles/all')
  const roleOptions = useMemo(() => {
    return (allRoles || []).map((item) => {
      const { id, name } = item
      return { value: id, label: name }
    })
  }, [allRoles])

  const { data: allIndustrys } = useQuery('/api/industrys')

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

  const onModalOk = () => {
    setConfirmLoading(true)
    form
      .validateFields()
      .then((values) => {
        const request = modalDetail.id
          ? updateUser(modalDetail.id, values)
          : addUser(values)
        return request
      })
      .then(() => {
        setModalVisible(false)
        setConfirmLoading(false)
        // 是修改就刷新当前页面，是添加就到第一页去
        if (modalDetail.id) {
          setFilter({ ...filter })
        } else {
          setFilter({ ...filter, current: 1 })
        }
      })
      .catch(() => {
        setConfirmLoading(false)
      })
  }

  const renderTreeNode = ({ id, name, children }) => (
    <TreeSelect.TreeNode key={id} value={id} title={name}>
      {children?.map((item) => renderTreeNode(item))}
    </TreeSelect.TreeNode>
  )

  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '角色', dataIndex: 'roleName' },
    { title: '行业', dataIndex: 'industryName' },
    {
      title: '操作',
      dataIndex: 'id',
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
      </div>
      <Table
        rowKey='id'
        loading={loading || deleteLoading}
        columns={columns}
        pagination={pagination}
        dataSource={data?.list}
        onChange={onTableChange}
      />
      <Modal
        destroyOnClose
        visible={modalVisible}
        title={`${modalDetail.id ? '修改' : '添加'}用户`}
        confirmLoading={confirmLoading}
        onCancel={() => setModalVisible(false)}
        onOk={onModalOk}
      >
        <Form {...formLayout} form={form} preserve={false}>
          <Form.Item
            name='name'
            label='姓名'
            initialValue={modalDetail.name}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='role'
            label='角色'
            initialValue={modalDetail.role}
            rules={[{ required: true }]}
          >
            <Select options={roleOptions} />
          </Form.Item>
          <Form.Item
            name='industry'
            label='行业'
            initialValue={modalDetail.industry}
            rules={[{ required: true }]}
          >
            <TreeSelect>{(allIndustrys || []).map(renderTreeNode)}</TreeSelect>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserList
