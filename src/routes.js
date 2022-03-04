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
  { path: '/login', Com: Login },
  { path: '/', Com: Play, title: 'play', isMenu: true },
  { path: '/stat', Com: Stat, title: '统计数据', isMenu: true },
  { path: '/role', Com: RoleList, title: '角色管理', isMenu: true },
  { path: '/role-new', Com: RoleListNew, title: '角色管理-新', isMenu: true },
  { path: '/user', Com: UserList, title: '用户管理', isMenu: true },
  { path: '/user/detail', Com: UserDetail, title: '用户详情' },
  { path: '/swr', Com: SWR, title: 'SWR', isMenu: true },
  {
    path: '/require-context',
    Com: RequireContext,
    title: 'require.context',
    isMenu: true,
  },
  { path: '/webp', Com: Webp, title: '.webp图片', isMenu: true },
]

export default routes
