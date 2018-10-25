// @flow

import type { ThunkAction, Log } from '../../types'
import * as firebaseLogic from '../Firebase/logic'
import * as actions from './actions'

export function load(): ThunkAction {
  return async (dispatch, getState) => {
    firebaseLogic.loadLogsAtHour()
  }
}

export function saveSnap(log: Log): ThunkAction {
  return async (dispatch, getState) => {
    await dispatch(actions.receiveLog(log))
  }
}
