import { useNavigate, useLocation } from 'react-router-dom'
import qs from 'qs'
import loginBroadcast from 'utils/loginBroadcast'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const onClickLogin = () => {
    const searchObj = qs.parse(location.search, { ignoreQueryPrefix: true })
    navigate(searchObj.from || '/')
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
