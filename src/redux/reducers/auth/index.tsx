import {
  AuthActions,
  IAction,
  InitialState,
} from '../../actions/auth/auth-types'

const initialState: InitialState = {
  userData: {
    id: 12,
    first_name: 'Nain',
    last_name: 'sdvsdgfd',
    email: 'sdvd@dfb.com',
    role: 'Admin',
    status: 'Active',
    createdAt: 'sdvfd',
    updatedAt: 'sdvsd',
    userId: null,
    token: 'dfsdfd',
  },
  token: 'assdf',
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
