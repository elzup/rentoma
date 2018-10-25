// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import type { State as RootState } from '../../types'
import * as selectors from './selectors'
import { Page } from '../../components/common'
import { load } from './logic'

type Props = {
  load: typeof load,
  logs: any,
}

class TopPage extends React.Component<Props> {
  componentDidMount() {
    this.props.load()
  }

  render() {
    // const { props } = this
    return <Page>hoge</Page>
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
