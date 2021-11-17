export enum CovidSurveyActions {
  ADD_COVID_SURVEY = 'ADD_COVID_SURVEY',
}

export type covidObj = {
  id: number
  userId: number
  first_name: string
  last_name: string
  age_group: string
  out_break: string
  countryId: number
  status: string
  createdAt: string
  updatedAt: string
}

type AddCovidSurvey = {
  type: CovidSurveyActions.ADD_COVID_SURVEY
  payload: covidObj
}

export type IAction = AddCovidSurvey

export type InitialState = {
  covidObj: covidObj | null
}
