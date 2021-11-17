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
export type AppDispatch = ThunkDispatch<any, RootState, AnyAction>
export default rootReducer
