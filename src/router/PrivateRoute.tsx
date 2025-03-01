import React from 'react'
import { useSelector } from 'react-redux'
import { RouteProps, Redirect, Route } from 'react-router-dom'
import { RootState } from '../redux/reducers/rootReducers'

type PrivateRouteProps = RouteProps

const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...rest }) => {
  const authToken = useSelector((state: RootState) => state.authReducer.token)
  if (!authToken || authToken === '') return <Redirect to="/login" />

  return (
    <React.Fragment>
      <Route {...rest} />
    </React.Fragment>
  )
}

export default PrivateRoute
