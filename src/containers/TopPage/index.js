// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

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
          <table>
            <tr>
              <th>general</th>
              <td>{JSON.stringify(log.general)}</td>
            </tr>
            <tr>
              <th>body</th>
              <td>{log.body}</td>
              headers: Object, body: string, timestamp: number,
            </tr>
            <tr>
              <th>headers</th>
              <td>
                <ul>
                  {_.map(log.headers, (v, k) => (
                    <li>
                      {k}:{v}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </table>
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
