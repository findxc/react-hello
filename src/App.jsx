import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SWRConfig } from 'swr'
import axios from 'axios'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import Layout from './layouts'
import NoMatch from './pages/no-match'
import routes from './routes'

import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label}不能为空',
}

const swrDefaultConfig = {
  fetcher: (url, params) => axios.get(url, { params }).then((res) => res.data),
}

export function GlobalConfig(props) {
  return (
    <SWRConfig value={swrDefaultConfig}>
      <ConfigProvider {...props} locale={zhCN} form={{ validateMessages }} />
    </SWRConfig>
  )
}

function App() {
  return (
    <GlobalConfig>
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
    </GlobalConfig>
  )
}

export default App
