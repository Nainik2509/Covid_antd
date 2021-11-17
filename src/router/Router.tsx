import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const CovidForm = React.lazy(() => import('../views/CovidForm'))
const LoginPage = React.lazy(() => import('../views/Login'))

export const Router = () => {
  // Country Listing from store
  return (
    <Switch>
      <PublicRoute exact path="/" component={LoginPage} />
      <PublicRoute exact path="/login" component={LoginPage} />
      <PrivateRoute exact path="/dashboard" component={CovidForm} />
      <PublicRoute render={() => <h1>404 Page not found</h1>} />
    </Switch>
  )
}
