import * as ReactDOM from 'react-dom'
import { GlobalConfig } from '../App'

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
      // 这里加上了 GlobalConfig ，但是如果想获取其它 context 的内容还是获取不到，比如 useHistory
      ReactDOM.render(
        <GlobalConfig>
          <MyModal {...props} />
        </GlobalConfig>,
        div
      )
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
