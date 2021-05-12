import React from 'react'
import { Link } from 'react-router-dom'

import styles from './index.module.css'

function Layout(props) {
  const { children } = props
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
