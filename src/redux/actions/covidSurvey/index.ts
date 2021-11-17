import API from '../../api'
import { CovidSurveyActions, IAction } from './covidSurvey-types'
import { Dispatch } from 'redux'

type covidFormData = {
  first_name: string
  last_name: string
  age_group: string
  countryId: number | null
  out_break: string
}
// ** API for add Covid Survey
export const addCovidSurvey = (data: covidFormData) => {
  return async (dispatch: Dispatch<IAction>) => {
    return API.post(`/api/v1/covidSurvey/`, data).then((response) => {
      if (response && response.status === 200) {
        dispatch({
          type: CovidSurveyActions.ADD_COVID_SURVEY,
          payload: response.data.data,
        })
        return true
      } else {
        return false
      }
    })
  }
}
