import {
  AuthActions,
  IAction,
  InitialState,
} from '../../actions/auth/auth-types'

const initialState: InitialState = {
  userData: null,
  token: '',
}

const Autheducer = (
  state: InitialState = initialState,
  action: IAction
): InitialState => {
  switch (action.type) {
    case AuthActions.USER_LOGIN:
      return {
        ...state,
        userData: action.payload.userData,
        token: action.payload.token,
      }
    case AuthActions.USER_UNAUTHORIZE:
      return {
        ...state,
        userData: null,
        token: '',
      }
    default:
      return state
  }
}
export default Autheducer
