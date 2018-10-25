// @flow
import type { State } from '../../types'

export const getLogs = (state: State) => {
  return Object.values(state.TopPage)
}
