export enum CountryActions {
  GET_COUNTRY_LIST = 'GET_COUNTRY_LIST',
}

export type CountryObj = {
  id: number
  name: string
  iso: string
  nicename: string
  iso3: string
  numcode: number
  phonecode: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

type CountryList = {
  type: CountryActions.GET_COUNTRY_LIST
  payload: Array<CountryObj>
}

export type IAction = CountryList | any

export type InitialState = {
  countryList: Array<CountryObj>
}
