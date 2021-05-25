import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal, Form, Input, Button } from 'antd'
import { addRole, updateRole } from './service'

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
}

function EditRoleModal(props) {
  const { visible, detail = {}, onCancel, onOk, ...restProps } = props
  const modalTitle = detail.id ? '编辑角色' : '添加角色'

  const [confirmLoading, setConfirmLoading] = useState(false)

  const [form] = Form.useForm()

  const history = useHistory()

  const _onOk = () => {
    form.validateFields().then((values) => {
      setConfirmLoading(true)
      const request = detail.id
        ? updateRole(detail.id, values)
        : addRole(values)
      request.then(() => {
        setConfirmLoading(false)
        onOk()
      })
    })
  }

  const toHome = () => {
    console.log(history)
    history.push('/')
  }

  return (
    <Modal
      {...restProps}
      destroyOnClose
      title={modalTitle}
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={_onOk}
      onCancel={onCancel}
    >
      <Button onClick={toHome}>测试 useHistory 正常使用，点击跳转首页</Button>
      <br />
      <br />
      <Form {...formLayout} form={form} preserve={false}>
        <Form.Item
          name='name'
          label='角色名称'
          initialValue={detail.name}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='desc'
          label='角色描述'
          initialValue={detail.desc}
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditRoleModal
