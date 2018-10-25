// @flow
import type { Log } from '../../types'

export const RECEIVE_LOGS: 'TopPage/RECEIVE_LOGS' = 'TopPage/RECEIVE_LOGS'
export const RECEIVE_LOG: 'TopPage/RECEIVE_LOG' = 'TopPage/RECEIVE_LOG'

export const Actions = {
  RECEIVE_LOGS,
  RECEIVE_LOG,
}

export type ReceiveLogs = {
  type: typeof RECEIVE_LOGS,
  logs: Log[],
}

export type ReceiveLog = {
  type: typeof RECEIVE_LOG,
  log: Log,
}

export type Action = ReceiveLogs | ReceiveLog
