import { useState, useMemo } from 'react'

function useModal(MyModal) {
  const [visible, setVisible] = useState(false)
  const [modalProps, setModalProps] = useState({})

  const modal = useMemo(() => {
    return <MyModal {...modalProps} visible={visible} />
  }, [visible, modalProps])

  const openModal = (newModalProps) => {
    setModalProps({
      ...newModalProps,
      onCancel: () => {
        if (newModalProps.onCancel) {
          newModalProps.onCancel()
        }
        setVisible(false)
      },
      onOk: () => {
        if (newModalProps.onOk) {
          newModalProps.onOk()
        }
        setVisible(false)
      },
    })
    setVisible(true)
  }

  return [modal, openModal]
}

export default useModal
