import Login from './pages/login'
import RoleList from './pages/role-manage'
import RoleListNew from './pages/role-manage/index-new'
import UserList from './pages/user-manage'
import Play from './pages/play'
import SWR from './pages/swr'

const routes = [
  { path: '/login', Com: Login },
  { path: '/', Com: Play, title: 'play', isMenu: true },
  { path: '/role', Com: RoleList, title: '角色管理', isMenu: true },
  { path: '/role-new', Com: RoleListNew, title: '角色管理-新', isMenu: true },
  { path: '/user', Com: UserList, title: '用户管理', isMenu: true },
  { path: '/swr', Com: SWR, title: 'SWR', isMenu: true },
]

export default routes
