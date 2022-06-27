import MyCard from 'components/MyCard'
import useGlobalData from 'utils/useGlobalData'

function Play() {
  const userInfo = useGlobalData()

  return (
    <div>
      写各种 demo 的
      <br />
      userInfo: {userInfo && JSON.stringify(userInfo)}
      <br />
      <br />
      <MyCard title='hhh'>hello world</MyCard>
    </div>
  )
}

export default Play
