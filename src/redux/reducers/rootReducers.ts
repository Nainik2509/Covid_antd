import { AnyAction, combineReducers } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import countryReducer from './country/'
import authReducer from './auth/'
import covidSurveyReducer from './covidSurvey/'

const rootReducer = combineReducers({
  countryReducer,
  authReducer,
  covidSurveyReducer,
})

export type RootState = ReturnType<typeof rootReducer>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppDispatch = ThunkDispatch<any, RootState, AnyAction>
export default rootReducer
