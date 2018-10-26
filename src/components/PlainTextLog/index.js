// @flow
import * as React from 'react'
import _ from 'lodash'
import moment from 'moment'
import styled from 'styled-components'

import type { Log } from '../../types'

const Wrapper = styled.section``
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

type Props = {
  log: Log,
}

const PlainTextLog = (props: Props) => {
  const { log } = props
  const lines = `
${log.general.method} ${log.general.method} ${log.general.protocol}/${
    log.general.httpVersion
  }
${_.map(log.headers, (v, k) => `${k}:${v}`).join('\n')}
${log.body}
`
  return (
    <div>
      <h1>{moment(log.timestamp).format()}</h1>
      <Title>Hello World!</Title>
      <div>
        <code>
          <pre>{lines}</pre>
        </code>
      </div>
    </div>
  )
}

export default PlainTextLog
