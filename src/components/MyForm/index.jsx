import React from 'react'
import { Form, Input } from 'antd'

const defaultLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
}

function MyForm(props) {
  const { items, initialValues = {}, ...formProps } = props
  return (
    <Form {...defaultLayout} {...formProps}>
      {items.map((item) => {
        const { children, ...itemProps } = item
        return (
          <Form.Item
            initialValue={initialValues[itemProps.name]}
            {...itemProps}
          >
            {children || <Input />}
          </Form.Item>
        )
      })}
    </Form>
  )
}

export default MyForm
