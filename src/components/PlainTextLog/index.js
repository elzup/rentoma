// @flow
import * as React from 'react'
import _ from 'lodash'
import moment from 'moment'
import styled, { keyframes } from 'styled-components'

import type { Log } from '../../types'

type Props = {
  log: Log,
}

const PlainTextLog = (props: Props) => {
  const { log } = props
  const lines = []
  lines.push(
    `${log.general.method} ${log.general.protocol.toUpperCase()}/${
      log.general.httpVersion
    }`,
    ..._.map(log.headers, (v, k) => `${k}:${v}`),
    ...log.body.split('\n'),
  )
  return (
    <Wrapper>
      <Header>
        <MethodBadge data-method={log.general.method}>
          {log.general.method}
        </MethodBadge>
        {moment(log.timestamp).format()}
        {log.isJson && <JsonBadge>JSON</JsonBadge>}
      </Header>
      <code>
        <Code>
          {lines.map((line, i) => (
            <p key={i}>
              <pre>{line}</pre>
            </p>
          ))}
        </Code>
      </code>
    </Wrapper>
  )
}

const fadeIn = keyframes`
  from { background: orange; }
to { background: white; }
`

const Wrapper = styled.section``
const Header = styled.h2`
  font-size: 12px;
  border: solid 1px #baa;
  background: white;
  border-radius: 3px 2px 0 0;
  margin-bottom: 0;
  border-bottom: 0;
  padding: 10px;
  animation: ${fadeIn} 1s linear;
`

const Code = styled.div`
  overflow-x: scroll;
  border: solid 1px #baa;
  border-radius: 0 0 3px 3px;
  padding-left: 10px;
  p {
    line-height: 20px;
    margin: 0;
    font-size: 12px;
    font-family: Menlo, Courier, monospace;
    pre {
      margin: 0;
    }
  }
`

const MethodBadge = styled.span`
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

const JsonBadge = styled.span`
  background: white;
  padding: 2px 5px;
  margin: 5px;
  color: red;
  &:before {
    content: '{';
  }
  &:after {
    content: '}';
  }
`

export default PlainTextLog
