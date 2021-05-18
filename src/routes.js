import Login from './pages/login'
import RoleList from './pages/role-manage'
import UserList from './pages/user-manage'
import Play from './pages/play'

const routes = [
  { path: '/login', Com: Login },
  { path: '/', Com: Play, title: 'play', isMenu: true },
  { path: '/role', Com: RoleList, title: '角色管理', isMenu: true },
  { path: '/user', Com: UserList, title: '用户管理', isMenu: true },
]

export default routes