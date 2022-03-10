import { lazy } from 'react'

const Login = lazy(() => import('./pages/login'))
const Stat = lazy(() => import('./pages/stat'))
const RoleList = lazy(() => import('./pages/role-manage'))
const RoleListNew = lazy(() => import('./pages/role-manage/index-new'))
const UserList = lazy(() => import('./pages/user-manage'))
const UserDetail = lazy(() => import('./pages/user-manage/detail'))
const Play = lazy(() => import('./pages/play'))
const SWR = lazy(() => import('./pages/swr'))
const RequireContext = lazy(() => import('./pages/require-context'))
const Webp = lazy(() => import('./pages/webp'))

const routes = [
  { path: '/login', element: <Login /> },
  { path: '/', element: <Play />, title: 'play', isMenu: true },
  { path: '/stat', element: <Stat />, title: '统计数据', isMenu: true },
  { path: '/role', element: <RoleList />, title: '角色管理', isMenu: true },
  {
    path: '/role-new',
    element: <RoleListNew />,
    title: '角色管理-新',
    isMenu: true,
  },
  { path: '/user', element: <UserList />, title: '用户管理', isMenu: true },
  { path: '/user/detail', element: <UserDetail />, title: '用户详情' },
  { path: '/swr', element: <SWR />, title: 'SWR', isMenu: true },
  {
    path: '/require-context',
    element: <RequireContext />,
    title: 'require.context',
    isMenu: true,
  },
  { path: '/webp', element: <Webp />, title: '.webp图片', isMenu: true },
]

export default routes
