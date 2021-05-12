import { useState, useEffect } from 'react'

function UserList() {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((res) => {
        setList(res.list)
        setTotal(res.total)
      })
  }, [])

  return (
    <div>
      <div>用户列表页</div>
      <pre>
        total：{total}
        {'\n'}
        list：{JSON.stringify(list, null, 2)}
      </pre>
    </div>
  )
}

export default UserList
