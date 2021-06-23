import { useHistory, useLocation } from 'react-router-dom'
import qs from 'qs'
import loginBroadcast from 'utils/loginBroadcast'

function Login() {
  const history = useHistory()
  const location = useLocation()

  const onClickLogin = () => {
    const searchObj = qs.parse(location.search, { ignoreQueryPrefix: true })
    history.push(searchObj.from || '/')
    loginBroadcast.postMessage('true')
  }

  return (
    <div>
      <div>登录页面</div>
      <button onClick={onClickLogin}>登录</button>
    </div>
  )
}

export default Login
