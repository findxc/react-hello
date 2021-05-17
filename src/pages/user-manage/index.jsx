import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Button } from 'antd'
import timerStore from 'stores/timer'
import { getUsers } from './service'
import styles from './index.module.less'

function UserList() {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      timerStore.increaseTimer()
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    getUsers().then((res) => {
      const { total, list } = res.data
      setList(list)
      setTotal(total)
    })
  }, [])

  return (
    <div>
      <div>timerStore.secondsPassed: {timerStore.secondsPassed}</div>
      <div className={styles.titleRow}>用户列表页</div>
      <Button type='primary'>测试主题色配置</Button>
      <Card>
        <pre>
          total：{total}
          {'\n'}
          list：{JSON.stringify(list, null, 2)}
        </pre>
      </Card>
    </div>
  )
}

export default observer(UserList)
