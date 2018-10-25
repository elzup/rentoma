// @flow
import 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import _ from 'lodash'

// import type { ThunkAction } from '../../types'
import { firebaseDb as fdb } from '../../services/firebase'
// import * as actions from './actions'

export async function loadLogsAtHour(): Promise<any[]> {
  const logRaws: { [key: string]: any } = (await fdb
    .ref(`log`)
    .limitToLast(10)
    .once('value')).val()
  const logs = _.map(logRaws, (log, key) => log)
  return logs
}
