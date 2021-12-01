export enum AuthActions {
  USER_LOGIN = 'USER_LOGIN',
  USER_UNAUTHORIZE = 'USER_UNAUTHORIZE',
}

export type loginObj = {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  status: string
  createdAt: string
  updatedAt: string
  userId: null
  token: string
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
