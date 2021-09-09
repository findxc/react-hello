import { useState } from 'react'
import { Card, Button } from 'antd'

function FormCard(props) {
  const { title, addEditing, removeEditing, style = {} } = props

  const [editing, setEditing] = useState(false)

  const onClickCancel = () => {
    removeEditing(title)
    setEditing(false)
  }

  const onClickSave = () => {
    removeEditing(title)
    setEditing(false)
  }

  const onClickEdit = () => {
    addEditing(title)
    setEditing(true)
  }

  const renderExtra = () => {
    if (editing) {
      return (
        <>
          <Button onClick={onClickCancel}>取消</Button>
          <Button
            style={{ marginLeft: 24 }}
            type='primary'
            onClick={onClickSave}
          >
            保存
          </Button>
        </>
      )
    }
    return (
      <Button type='primary' onClick={onClickEdit}>
        编辑
      </Button>
    )
  }

  return (
    <Card
      title={<div id={title}>{title}</div>}
      extra={renderExtra()}
      style={style}
    >
      假装这里有一些表单项
      <br />
      假装这里有一些表单项
      <br />
      假装这里有一些表单项
    </Card>
  )
}

export default FormCard
