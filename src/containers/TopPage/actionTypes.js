// @flow
import type { Log } from '../../types'

export const RECEIVE_LOGS: 'TopPage/RECEIVE_LOGS' = 'TopPage/RECEIVE_LOGS'

export const Actions = {
  RECEIVE_LOGS,
}

export type ReceiveLogs = {
  type: typeof RECEIVE_LOGS,
  logs: Log[],
}

export type Action = ReceiveLogs
