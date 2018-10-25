// @flow
import type { Log } from '../../types'

import { RECEIVE_LOGS, RECEIVE_LOG } from './actionTypes'
import type { ReceiveLogs, ReceiveLog } from './actionTypes'

export function receiveLogs(logs: Log[]): ReceiveLogs {
  return {
    type: RECEIVE_LOGS,
    logs,
  }
}
export function receiveLog(log: Log): ReceiveLog {
  return {
    type: RECEIVE_LOG,
    log,
  }
}
