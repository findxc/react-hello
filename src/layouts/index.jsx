import React from 'react'
import { useLocation } from 'react-router-dom'
import BasicLayout from './BasicLayout'

function Layout(props) {
  const { children } = props
  const location = useLocation()

  // 登录页不需要 layout
  if (['/login'].includes(location.pathname)) {
    return children
  }
  return <BasicLayout>{children}</BasicLayout>
}

export default Layout
