const bc = new BroadcastChannel('login')

bc.onmessage = (event) => {
  const { data } = event
  if (data === 'true') {
    window.alert('你在其它页面登录了')
  } else if (data === 'false') {
    window.alert('你在其它页面退出登录了')
  }
}

export default bc
