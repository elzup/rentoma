// @flow

import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import TopPage from '../TopPage'

import createBrowserHistory from 'history/createBrowserHistory'
export const history = createBrowserHistory()

class App extends React.Component<*> {
  render() {
    return (
      <Router>
        <div>
          <Route exact path={'/'} component={TopPage} />
        </div>
      </Router>
    )
  }
}

export default App
