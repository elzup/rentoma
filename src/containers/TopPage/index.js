// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import type { State as RootState } from '../../types'
// import * as selectors from './selectors'
import { Page } from '../../components/common'

type Props = {}

class TopPage extends React.Component<Props> {
  render() {
    // const { props } = this
    return <Page>hoge</Page>
  }
}

const ms = (state: RootState) => ({})

const conn = connect(
  ms,
  {},
)

export default conn(TopPage)
