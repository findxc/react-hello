import * as ReactDOM from 'react-dom'

function openModal(MyModal, config) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  let currentConfig = {
    ...config,
    visible: true,
    onCancel: () => {
      if (config.onCancel) {
        config.onCancel()
      }
      close()
    },
    onOk: () => {
      if (config.onOk) {
        config.onOk()
      }
      close()
    },
  }

  function render(props) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      ReactDOM.render(<MyModal {...props} />, div)
    })
  }

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }

  function close() {
    render({
      ...currentConfig,
      visible: false,
      afterClose: destroy,
    })
  }

  render(currentConfig)
}

export default openModal
