// @flow
import type { Action, Log } from '../../types'
import { Actions } from './actionTypes'

export type State = { [id: string]: Log }

export const initialState: State = {}

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Actions.RECEIVE_LOGS:
      return action.logs.reduce((p, c) => ({ ...p, [c.id]: c }), {})
    case Actions.RECEIVE_LOG:
      return { ...state, [action.log.id]: action.log }
    default:
      return state
  }
}
