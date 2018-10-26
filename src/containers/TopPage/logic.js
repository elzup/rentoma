// @flow

import _ from 'lodash'
import type { ThunkAction, Log } from '../../types'
import * as firebaseLogic from '../Firebase/logic'
import * as actions from './actions'

export function load(): ThunkAction {
  return async (dispatch, getState) => {
    dispatch(firebaseLogic.loadLogsAtHour())
  }
}

type LogSnap = {
  general: {
    url: string,
    protocol: string,
    httpVersion: string,
    method: string,
    path: string,
  },
  headers: ?Object,
  body: ?string,
  timestamp: number,
}

const filterHeader = (header: ?Object) => {
  if (!header) {
    return {}
  }
  // TODO: firebase header

  return header
  // return _.omit(header, config.removeHeaderKeys)
}

const toLog = (snap: LogSnap, id: string): Log => {
  return {
    id,
    general: snap.general,
    headers: filterHeader(snap.headers),
    body: snap.body || '',
    timestamp: snap.timestamp,
  }
}

export function saveSnap(logs: Log): ThunkAction {
  return async (dispatch, getState) => {
    await dispatch(actions.receiveLogs(_.map(logs, toLog)))
  }
}
