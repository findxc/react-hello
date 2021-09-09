import { useRef } from 'react'
import { Prompt, useHistory } from 'react-router-dom'
import { Modal } from 'antd'

// 会在离开页面时，判断一下是否有未保存的卡片，有的话就进行提醒
function withLeavePrompt(WrappedComponent, offsetTop = 0) {
  return function (props) {
    const history = useHistory()

    const editingRef = useRef([])

    const addEditing = (title) => {
      editingRef.current.push(title)
    }

    const removeEditing = (title) => {
      editingRef.current = editingRef.current.filter((t) => t !== title)
    }

    const onPrompt = (nextLocation, action) => {
      if (!editingRef.current.length) {
        // return true 表示允许直接离开页面
        return true
      }

      Modal.confirm({
        title: '还有未保存的数据，确定离开当前页面吗？',
        // 点击取消的话，就自动滚动到第一个没保存的卡片
        onCancel: () => {
          const element = document.getElementById(editingRef.current[0])
          // copy from antd components/anchor
          const scrollY =
            window.pageYOffset + element.getBoundingClientRect().top - offsetTop
          window.scrollTo(0, scrollY)
        },
        // 点击确定的话，注意要先 editingRef.current = [] ，因为会再次进入 onPrompt
        onOk: () => {
          editingRef.current = []
          if (action === 'POP') {
            history.goBack()
          } else {
            history.push(nextLocation.pathname)
          }
        },
      })
      // return false 表示依然停留当前页面
      return false
    }

    return (
      <>
        <Prompt message={onPrompt} />
        {/* 给组件增加了 addEditing 和 removeEditing 属性 */}
        <WrappedComponent
          addEditing={addEditing}
          removeEditing={removeEditing}
          {...props}
        />
      </>
    )
  }
}

export default withLeavePrompt
