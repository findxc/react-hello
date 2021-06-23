import React, { useEffect } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Menu, Dropdown } from 'antd'
import globalStore from 'stores/global'
import loginBroadcast from 'utils/loginBroadcast'
import { getCurrentUser } from './service'
import routes from '../../routes'
import styles from './index.module.css'

const menus = routes
  .filter((item) => item.isMenu)
  .map((item) => ({ path: item.path, title: item.title }))

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClickLogout = () => {
    // 注意要重置下数据，否则下次登录进来会展示旧数据
    globalStore.reset()
    history.push('/login')
    loginBroadcast.postMessage('false')
  }

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        {menus.map((item) => {
          const { path, title } = item
          return (
            <NavLink
              key={path}
              exact
              activeClassName={styles.activeLink}
              to={path}
            >
              {title}
            </NavLink>
          )
        })}
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
