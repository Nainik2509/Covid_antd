import API from '../../api'
import { CountryActions, IAction } from './country-types'
import { Dispatch } from 'redux'

type ParsedFilter = {
  page: number
  perPage: number
  search: string
}
// ** API to Get Country Listing
export const getData = (parsedFilter: ParsedFilter) => {
  return async (dispatch: Dispatch<IAction>) => {
    return API.get(
      `/api/v1/country/?page=${parsedFilter.page}&perPage=${parsedFilter.perPage}&search=${parsedFilter.search}`
    ).then((response) => {
      if (response && response.status === 200) {
        dispatch({
          type: CountryActions.GET_COUNTRY_LIST,
          payload: response.data.data,
        })
        return true
      } else {
        return false
      }
    })
  }
}
