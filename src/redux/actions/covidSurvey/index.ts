import API from '../../api'
import { covidFormData, CovidSurveyActions, IAction } from './covidSurvey-types'
import { Dispatch } from 'redux'
import { ParsedFilter } from '../../../helpers/common-types'

type paramId = number

// ** API for get all users Covid Survey
export const getAllCovidSurvey = (params: ParsedFilter) => {
  return async (dispatch: Dispatch<IAction>) => {
    return API.get(
      `/api/v1/covidSurvey/?limit=${params.perPage}&perPage=${
        params.perPage
      }&search=${params.search}&counter=${true}`
    ).then((response) => {
      if (response && response.status === 200) {
        dispatch({
          type: CovidSurveyActions.GET_ALL_PAGINATED_COVID_SURVEY,
          payload: response.data.data,
          totalPages: response.data.count / params.perPage,
          count: response.data.count,
          params,
        })
        return true
      } else {
        return false
      }
    })
  }
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

// ** API for add Covid Survey
export const getCovidSurvey = () => {
  return async (dispatch: Dispatch<IAction>) => {
    return API.get(`/api/v1/covidSurvey/userCovidSurvey`).then((response) => {
      if (response && response.status === 200) {
        dispatch({
          type: CovidSurveyActions.GET_USER_COVID_SURVEY,
          payload: response.data.data,
        })
        return true
      } else {
        return false
      }
    })
  }
}

// ** API for add Covid Survey
export const updateCovidSurvey = (id: paramId, data: covidFormData) => {
  return async (dispatch: Dispatch<IAction>) => {
    return API.put(`/api/v1/covidSurvey/${id}`, data).then((response) => {
      if (response && response.status === 200) {
        dispatch({
          type: CovidSurveyActions.UPDATE_USER_COVID_SURVEY,
          payload: response.data.data,
        })
        return true
      } else {
        return false
      }
    })
  }
}
