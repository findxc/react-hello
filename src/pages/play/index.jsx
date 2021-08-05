import { useContext } from 'react'
import { GlobalContext } from 'layouts/BasicLayout'

function Play() {
  const userInfo = useContext(GlobalContext)

  return (
    <div>
      写各种 demo 的
      <br />
      userInfo: {userInfo && JSON.stringify(userInfo)}
    </div>
  )
}

export default Play
