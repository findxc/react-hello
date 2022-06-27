import { useState } from 'react'
import { Modal, Form, InputNumber } from 'antd'
import MyForm from 'components/MyForm'
import { numValidator } from 'utils/validate'
import RoleSelect from './RoleSelect'
import IndustrySelect from './IndustrySelect'
import { addUser, updateUser } from '../service'

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

  const formItems = [
    {
      name: 'name',
      label: '姓名',
      rules: [{ required: true }],
    },
    {
      name: 'num',
      label: '数字，测试校验',
      rules: [{ validator: numValidator(2, 1) }],
      children: <InputNumber style={{ width: '100%' }} />,
    },
    {
      name: 'role',
      label: '角色',
      rules: [{ required: true }],
      children: <RoleSelect />,
    },
    {
      name: 'industry',
      label: '行业',
      rules: [{ required: true }],
      children: <IndustrySelect />,
    },
  ]

  return (
    <Modal
      destroyOnClose
      visible={visible}
      title={`${detail.id ? '修改' : '添加'}用户`}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={onModalOk}
    >
      <MyForm
        preserve={false}
        form={form}
        items={formItems}
        initialValues={detail}
      />
    </Modal>
  )
}

export default EditModal
