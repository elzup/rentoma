// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { Action as _Action } from './action'
import type { State as _State } from './state'

export type State = _State
export type Action = _Action

export type GetState = () => State

type ThunkDispatch<A> = ThunkAction => A

export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>
export type Store = ReduxStore<State, Action, Dispatch>

export type ThunkAction = (
  dispatch: Dispatch,
  getState: GetState,
) => void | Promise<void>

export type System = {
  timestamp: number,
  timestampStr: string,
}

export type Log = {
  id: string,
  general: {
    url: string,
    protocol: string,
    httpVersion: string,
    method: string,
    path: string,
  },
  headers: Object,
  body: string,
  isJson: boolean,
  timestamp: number,
}

export type Axis = {
  x: number,
  y: number,
  z: number,
}
