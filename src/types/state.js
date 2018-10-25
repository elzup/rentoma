// @flow
import type { State as System } from '../containers/System/reducer'
import type { State as TopPage } from '../containers/TopPage/reducer'

export type State = {
  System: System,
  TopPage: TopPage,
}
