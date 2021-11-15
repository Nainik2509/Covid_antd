import {
  CountryActions,
  IAction,
  InitialState,
} from '../../actions/country/country-types'

const initialState: InitialState = {
  countryList: [],
}

const CountryReducer = (
  state: InitialState = initialState,
  action: IAction
): InitialState => {
  switch (action.type) {
    case CountryActions.GET_COUNTRY_LIST:
      return {
        ...state,
        countryList: action.payload,
      }
    default:
      return state
  }
}
export default CountryReducer
