// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import type { State as RootState, Log } from '../../types'
import * as selectors from './selectors'
import { Page } from '../../components/common'
import { load } from './logic'

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
      <Page>
        {props.logs.map(log => (
          <code>
            <pre>{JSON.stringify(log)}</pre>
          </code>
        ))}
      </Page>
    )
  }
}

const ms = (state: RootState) => ({
  logs: selectors.getLogs(state),
})

const conn = connect(
  ms,
  { load },
)

export default conn(TopPage)
