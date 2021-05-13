import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from '../layouts'

import Login from './login'
import NoMatch from './NoMatch'

import RoleList from './role-manage'
import UserList from './user-manage'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/role'>
            <RoleList />
          </Route>
          <Route exact path='/'>
            <UserList />
          </Route>
          <Route path='*'>
            <NoMatch />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
