// @flow
import 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { saveSnap } from '../TopPage/logic'
import type { ThunkAction } from '../../types'

// import type { ThunkAction } from '../../types'
import { firebaseDb as fdb } from '../../services/firebase'
// import * as actions from './actions'

export function loadLogsAtHour(): ThunkAction {
  return async (dispatch, getState) => {
    fdb
      .ref(`log`)
      .limitToLast(10)
      .on('value', snap => {
        dispatch(saveSnap(snap.val()))
      })
  }
}
