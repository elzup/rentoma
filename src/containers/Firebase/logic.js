// @flow
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import _ from 'lodash'

// import type { ThunkAction } from '../../types'
import { firebaseDb as fdb } from '../../services/firebase'
// import * as actions from './actions'

export async function loadLogsAtHour(
  topicId: string,
  deviceId: string,
): Promise<any[]> {
  const logRaws: { [key: string]: any } = (await fdb
    .ref(`topic-device-log/${topicId}/${deviceId}`)
    .limitToLast(100)
    .once('value')).val()
  const logs = _.map(logRaws, (log, key) => log)
  return logs
}
