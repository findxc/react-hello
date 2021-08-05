import useGlobalData from 'utils/useGlobalData'

function Play() {
  const userInfo = useGlobalData()

  return (
    <div>
      写各种 demo 的
      <br />
      userInfo: {userInfo && JSON.stringify(userInfo)}
    </div>
  )
}

export default Play
