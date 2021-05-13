import React, { useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'

import styles from './index.module.css'

function Layout(props) {
  const { children } = props
  const location = useLocation()
  const history = useHistory()

  const { pathname, search } = location

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

  // 登录页不需要 layout
  if (location.pathname === '/login') {
    return children
  }
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Link to='/'>用户管理</Link>
        <Link to='/role'>角色管理</Link>
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  )
}

export default Layout
