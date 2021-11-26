import API from '../../api'
import { AuthActions, IAction } from './auth-types'
import { Dispatch } from 'redux'
import { AUTH_LOGIN } from '../../apiEndPoints'

type loginData = {
  email: string
  password: string
}
// ** API for user login
export const handleLogin = (data: loginData) => {
  return async (dispatch: Dispatch<IAction>) => {
    return API.post(`${AUTH_LOGIN}`, data).then((response) => {
      if (response && response.status === 200) {
        dispatch({
          type: AuthActions.USER_LOGIN,
          payload: {
            userData: response.data.data,
            token: response.data.data.token,
          },
        })
        return true
      } else {
        return false
      }
    })
  }
}

// ** API to handle unauthorised user
export const handleunAuthorised = () => {
  return async (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: AuthActions.USER_UNAUTHORIZE,
    })
    return true
  }
}

// ** API to handle unauthorised user
export const handleLogOut = () => {
  return async (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: AuthActions.USER_UNAUTHORIZE,
    })
    return true
  }
}
