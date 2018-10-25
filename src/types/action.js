// @flow
import type { Action as SystemAction } from '../containers/System/actionTypes'
import type { Action as TopPageAction } from '../containers/TopPage/actionTypes'

export type ReduxInitAction = {
  type: '@@INIT',
}

export type Action = ReduxInitAction | SystemAction | TopPageAction
