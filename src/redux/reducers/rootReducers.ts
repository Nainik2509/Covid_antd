import { AnyAction, combineReducers } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import countryReducer from './country/'
import authReducer from './auth/'

const rootReducer = combineReducers({
  countryReducer,
  authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<any, any, AnyAction>
export default rootReducer
