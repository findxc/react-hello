import axios from 'axios'
import { stringify } from 'qs'

function setupAxios() {
  // 如果后端接口是允许跨域的，那直接在这里配置上就行了，否则还需要配置代理
  // axios.defaults.baseURL = 'https://api.example.com';

  axios.defaults.paramsSerializer = (params) => {
    return stringify(params, { arrayFormat: 'repeat' })
  }

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      // TODO 对于错误信息可以在这里统一提示下

      const { status } = error.response
      if (status === 401) {
        // 因为这里无法使用 useHistory 也就无法直接 history.push
        // 而又不想直接 window.location
        // 所以就触发一个自定义事件，然后在 App 里面去处理
        const toLoginEvent = new CustomEvent('toLogin')
        window.dispatchEvent(toLoginEvent)
      }

      return Promise.reject(error)
    }
  )
}

export default setupAxios
