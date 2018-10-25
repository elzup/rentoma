// @flow
import { combineReducers } from 'redux'
import System from './containers/System/reducer'
import TopPage from './containers/TopPage/reducer'

export default combineReducers({
  System,
  TopPage,
})
