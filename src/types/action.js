// @flow
import type { Action as SystemAction } from '../containers/System/actionTypes'

export type ReduxInitAction = {
  type: '@@INIT',
}

export type Action = ReduxInitAction | SystemAction
