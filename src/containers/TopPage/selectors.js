// @flow

import _ from 'lodash'
import type { State } from '../../types'

export const getLogs = (state: State) => {
  return _.reverse(_.sortBy(Object.values(state.TopPage), 'timestamp'))
}
