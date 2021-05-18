import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './layouts'
import NoMatch from './pages/no-match'
import routes from './routes'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          {routes.map((item) => {
            const { path, Com } = item
            return (
              <Route key={path} exact path={path}>
                <Com />
              </Route>
            )
          })}
          <Route path='*'>
            <NoMatch />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
