import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { notifyError } from '../utils/toaster'
import history from '../../history'
import { store } from './store'
import { AuthActions } from './actions/auth/auth-types'

const API = axios.create({
  baseURL: 'http://localhost:8000/',
  responseType: 'json',
})

export default API

// Axios Request interceptors
API.interceptors.request.use((req: AxiosRequestConfig) => {
  const userToken = store.getState().authReducer.token
  if (userToken)
    req.headers = { Authorization: 'Bearer ' + userToken.replace(/^"|"$/g, '') }
  console.log(`[${req.method}] ${req.url}`)
  console.log(`Headers :`)
  console.log(req.headers)
  console.log(`Params : `)
  console.log(req.params)
  console.log(`Data : `)
  console.log(req.data)
  return req
})

API.interceptors.response.use(
  (res: AxiosResponse) => {
    console.log('Response : ')
    console.log(res.data)
    return res
  },
  (err: AxiosError) => {
    const { dispatch } = store
    console.log('Error :')
    console.log(err)
    if (err?.response?.status === 400) {
      notifyError({ header: null, message: err?.response?.data?.message })
    }
    if (err?.response?.status === 404) {
      notifyError({ header: null, message: err?.response?.data?.message })
    }
    if (err?.response?.status === 403) {
      notifyError({
        header: 'Forbidden',
        message: err?.response?.data?.message,
      })
    }
    if (err?.response?.status === 401) {
      notifyError({
        header: 'UnAuthorised',
        message: err?.response?.data?.message,
      })
      dispatch({ type: AuthActions.USER_UNAUTHORIZE })
      history.push('/')
    }
    return err
  }
)
