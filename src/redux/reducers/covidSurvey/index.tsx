import {
  CovidSurveyActions,
  IAction,
  InitialState,
} from '../../actions/covidSurvey/covidSurvey-types'

const initialState: InitialState = {
  covidObj: null,
  covidSurveyList: [],
  totalPages: 0,
  count: 0,
  params: null,
}

const CountryReducer = (
  state: InitialState = initialState,
  action: IAction
): InitialState => {
  switch (action.type) {
    case CovidSurveyActions.GET_ALL_PAGINATED_COVID_SURVEY:
      return {
        ...state,
        covidSurveyList: action.payload,
        totalPages: action.totalPages,
        count: action.count,
        params: action.params,
      }
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
    case CovidSurveyActions.GET_COVID_SURVEY_BY_ID:
      return {
        ...state,
        covidObj: action.payload,
      }
    case CovidSurveyActions.DELETE_USER_COVID_SURVEY:
      return {
        ...state,
      }
    default:
      return state
  }
}
export default CountryReducer
