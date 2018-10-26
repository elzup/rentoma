// @flow
import * as React from 'react'
import _ from 'lodash'
import moment from 'moment'
import styled from 'styled-components'

import type { Log } from '../../types'

type Props = {
  log: Log,
}

const PlainTextLog = (props: Props) => {
  const { log } = props
  const lines = []
  lines.push(
    `${log.general.method} ${log.general.protocol} / ${
      log.general.httpVersion
    }`,
    ..._.map(log.headers, (v, k) => `${k}:${v}`),
    ...log.body.split('\n'),
  )
  return (
    <Wrapper>
      <h2>
        <MethodBadge data-method={log.general.method}>
          {log.general.method}
        </MethodBadge>
        {moment(log.timestamp).format()}
      </h2>
      <code>
        <Code>
          {lines.map(line => (
            <p>{line}</p>
          ))}
        </Code>
      </code>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  h2 {
    font-size: 12px;
    border: solid 1px #baa;
    background: #fee;
    border-radius: 3px 2px 0 0;
    margin-bottom: 0;
    border-bottom: 0;
    padding: 10px;
  }
`
const Code = styled.div`
  border: solid 1px #baa;
  border-radius: 0 0 3px 3px;
  padding-left: 10px;
  p {
    line-height: 20px;
    margin: 0;
    font-size: 12px;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
      monospace;
  }
`

const MethodBadge = styled.span`
  border: #aaa;
  background: white;
  padding: 2px 5px;
  margin: 5px;
  &[data-method='GET'] {
    color: purple;
  }
  &[data-method='POST'] {
    color: green;
  }
`

export default PlainTextLog
