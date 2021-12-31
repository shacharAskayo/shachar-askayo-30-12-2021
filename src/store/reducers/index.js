import { combineReducers } from 'redux'
import { weatherReducer } from './weatherReducer'
import { systemReducer } from './systemReducer'

export const rootReducer = combineReducers({
   weatherReducer,
})
