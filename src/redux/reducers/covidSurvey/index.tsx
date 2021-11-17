import {
  CovidSurveyActions,
  IAction,
  InitialState,
} from '../../actions/covidSurvey/covidSurvey-types'

const initialState: InitialState = {
  covidObj: null,
}

const CountryReducer = (
  state: InitialState = initialState,
  action: IAction
): InitialState => {
  switch (action.type) {
    case CovidSurveyActions.ADD_COVID_SURVEY:
      return {
        ...state,
        covidObj: action.payload,
      }
    case CovidSurveyActions.GET_USER_COVID_SURVEY:
      return {
        ...state,
        covidObj: action.payload,
      }
    case CovidSurveyActions.UPDATE_USER_COVID_SURVEY:
      return {
        ...state,
        covidObj: action.payload,
      }
    default:
      return state
  }
}
export default CountryReducer
