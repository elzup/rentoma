// @flow

import _ from 'lodash'
import moment from 'moment'
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
  body: string | Object | null | void,
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

const bodyToString = (body: string | Object | null | void): string => {
  if (typeof body === 'string') {
    return body
  } else if (!body) {
    return '[ body empty ]'
  } else {
    return JSON.stringify(body, null, '  ')
  }
}

const toLog = (snap: LogSnap, id: string): Log => {
  const isJson = typeof snap.body === 'object' && snap.body !== null
  const body = bodyToString(snap.body)
  return {
    id,
    general: snap.general,
    headers: filterHeader(snap.headers),
    body,
    isJson,
    timestamp: snap.timestamp,
    timeLabel: moment(snap.timestamp).format(),
  }
}

export function saveSnap(logs: Log): ThunkAction {
  return async (dispatch, getState) => {
    await dispatch(actions.receiveLogs(_.map(logs, toLog)))
  }
}
