// @flow
import { connect } from 'react-redux'
import * as React from 'react'

import { Page } from '../../components/common'
import type { State as RootState, Log } from '../../types'
import { load } from './logic'
import LogList from '../../components/LogList'
import NavBar from '../../components/NavBar'
import EyeCatch from '../../components/EyeCatch'
import * as selectors from './selectors'

type Props = {
  load: typeof load,
  logs: Log[],
}

class TopPage extends React.Component<Props> {
  componentDidMount() {
    this.props.load()
  }

  render() {
    const { props } = this
    return (
      <>
        <NavBar />
        <Page>
          <LogList logs={props.logs} />
          <EyeCatch />
        </Page>
      </>
    )
  }
}

const ms = (state: RootState) => ({
  logs: selectors.getLogs(state),
})

const conn = connect(ms, { load })

export default conn(TopPage)
