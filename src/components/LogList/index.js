// @flow
import * as React from 'react'

import type { Log } from '../../types'
import PlainTextLog from '../PlainTextLog'

type Props = {
  logs: Log[],
}

const LogList = (props: Props) => {
  return (
    <div>
      {props.logs.map(log => (
        <PlainTextLog key={log.id} log={log} />
      ))}
    </div>
  )
}

export default LogList
