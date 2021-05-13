import { useState, useEffect } from 'react'
import { getUsers } from './service'

function UserList() {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getUsers().then((res) => {
      const { total, list } = res.data
      setList(list)
      setTotal(total)
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
