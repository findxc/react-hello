import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from '../layouts'

import RoleList from './role-manage'
import UserList from './user-manage'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/role'>
            <RoleList />
          </Route>
          <Route path='/'>
            <UserList />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
