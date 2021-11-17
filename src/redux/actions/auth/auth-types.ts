export enum AuthActions {
  USER_LOGIN = 'USER_LOGIN',
  USER_UNAUTHORIZE = 'USER_UNAUTHORIZE',
}

export type loginObj = {
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

type AuthLogin = {
  type: AuthActions.USER_LOGIN
  payload: { userData: loginObj; token: string }
}

type HandleunAuthorised = {
  type: AuthActions.USER_UNAUTHORIZE
}

export type IAction = AuthLogin | HandleunAuthorised

export type InitialState = {
  userData: loginObj | null
  token: string
}
