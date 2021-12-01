import { ParsedFilter } from '../../../helpers/common-types'

export enum CovidSurveyActions {
  ADD_COVID_SURVEY = 'ADD_COVID_SURVEY',
  GET_USER_COVID_SURVEY = 'GET_USER_COVID_SURVEY',
  GET_ALL_PAGINATED_COVID_SURVEY = 'GET_ALL_PAGINATED_COVID_SURVEY',
  UPDATE_USER_COVID_SURVEY = 'UPDATE_USER_COVID_SURVEY',
  DELETE_USER_COVID_SURVEY = 'DELETE_USER_COVID_SURVEY',
  GET_COVID_SURVEY_BY_ID = 'GET_COVID_SURVEY_BY_ID',
}

export type covidFormData = {
  first_name: string
  last_name: string
  age_group: string
  infected: boolean
  symptoms: string[]
  awareness: number
  limitations: number
  detect: number
  hospitals: number
  healthcare: number
  treatment: number
  out_break: string
  countryId: number | null
}

export type covidObj = {
  id: number
  userId: number
  first_name: string
  last_name: string
  age_group: string
  infected: boolean
  symptoms: string[]
  awareness: number
  limitations: number
  detect: number
  hospitals: number
  healthcare: number
  treatment: number
  out_break: string
  countryId: number | null
  status: string
  createdAt: string
  updatedAt: string
}

type DataListCovidSurvey = {
  type: CovidSurveyActions.GET_ALL_PAGINATED_COVID_SURVEY
  payload: covidObj[]
  totalPages: number
  count: number
  params: ParsedFilter
}

type AddCovidSurvey = {
  type: CovidSurveyActions.ADD_COVID_SURVEY
  payload: covidObj
}

type GetUserCovidSurvey = {
  type: CovidSurveyActions.GET_USER_COVID_SURVEY
  payload: covidObj
}

type updateCovidSurvey = {
  type:
    | CovidSurveyActions.UPDATE_USER_COVID_SURVEY
    | CovidSurveyActions.GET_COVID_SURVEY_BY_ID
  payload: covidObj
}

type deleteCovidSurvey = {
  type: CovidSurveyActions.DELETE_USER_COVID_SURVEY
}

export type IAction =
  | DataListCovidSurvey
  | AddCovidSurvey
  | GetUserCovidSurvey
  | updateCovidSurvey
  | deleteCovidSurvey

export type InitialState = {
  covidObj: covidObj | null
  covidSurveyList: covidObj[] | []
  totalPages: number
  count: number
  params: ParsedFilter | null
}
