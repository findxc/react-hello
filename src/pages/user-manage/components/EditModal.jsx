import { useState } from 'react'
import { Modal, Form, Input, InputNumber } from 'antd'
import RoleSelect from './RoleSelect'
import IndustrySelect from './IndustrySelect'
import { addUser, updateUser } from '../service'
import { numValidator } from 'utils/validate'

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
}

function EditModal(props) {
  const { detail, visible, onCancel, onSuccess } = props

  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)

  const onModalOk = () => {
    setConfirmLoading(true)
    form
      .validateFields()
      .then((values) => {
        const request = detail.id
          ? updateUser(detail.id, values)
          : addUser(values)
        return request
      })
      .then(() => {
        onSuccess()
        setConfirmLoading(false)
      })
      .catch(() => {
        setConfirmLoading(false)
      })
  }

  return (
    <Modal
      destroyOnClose
      visible={visible}
      title={`${detail.id ? '修改' : '添加'}用户`}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={onModalOk}
    >
      <Form {...formLayout} form={form} preserve={false}>
        <Form.Item
          name='name'
          label='姓名'
          initialValue={detail.name}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='num'
          label='数字，测试校验'
          initialValue={detail.num}
          rules={[{ validator: numValidator(2, 1) }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name='role'
          label='角色'
          initialValue={detail.role}
          rules={[{ required: true }]}
        >
          <RoleSelect />
        </Form.Item>
        <Form.Item
          name='industry'
          label='行业'
          initialValue={detail.industry}
          rules={[{ required: true }]}
        >
          <IndustrySelect />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditModal
