import React, { useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Menu, Dropdown } from 'antd'
import globalStore from '../../stores/global'
import { getCurrentUser } from './service'
import styles from './index.module.css'

function BasicLayout(props) {
  const { children } = props
  const location = useLocation()
  const history = useHistory()

  const { pathname, search } = location

  useEffect(() => {
    getCurrentUser().then((res) => {
      globalStore.updateUserInfo(res.data)
    })
  }, [])

  useEffect(() => {
    // 监听 axios.interceptors 的 401 跳转登录页面
    const toLoginListener = () => {
      history.push(`/login?from=${pathname}${search}`)
    }
    window.addEventListener('toLogin', toLoginListener)

    return () => {
      window.removeEventListener('toLogin', toLoginListener)
    }
  }, [])

  const onClickLogout = () => {
    // 注意要重置下数据，否则下次登录进来会展示旧数据
    globalStore.reset()
    history.push('/login')
  }

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Link to='/'>用户管理</Link>
        <Link to='/role'>角色管理</Link>
      </div>
      <div className={styles.main}>
        <div className={styles.header}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={onClickLogout}>退出登录</Menu.Item>
              </Menu>
            }
          >
            <span>当前登录用户：{globalStore.userInfo.username}</span>
          </Dropdown>
        </div>
        {children}
      </div>
    </div>
  )
}

export default observer(BasicLayout)
