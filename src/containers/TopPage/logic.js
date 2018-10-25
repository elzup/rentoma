// @flow
import type { ThunkAction } from '../../types'
import * as firebaseLogic from '../Firebase/logic'
import * as actions from './actions'

export function load(): ThunkAction {
  return async (dispatch, getState) => {
    const logs = await firebaseLogic.loadLogsAtHour()
    await dispatch(actions.receiveLogs(logs))
  }
}
