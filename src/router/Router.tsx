import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Main from '../layout/Main'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const CovidForm = React.lazy(() => import('../views/CovidFormAntd'))
const LoginPage = React.lazy(() => import('../views/LoginAntd'))

export const Router = () => {
  // Country Listing from store
  return (
    <Switch>
      <PublicRoute exact path="/" component={LoginPage} />
      <PublicRoute exact path="/login" component={LoginPage} />
      <Main>
        <PrivateRoute exact path="/dashboard" component={CovidForm} />
        <PrivateRoute exact path="/survey-list" component={CovidForm} />
        <PrivateRoute exact path="/add-survey" component={CovidForm} />
        <Redirect from="*" to="/dashboard" />
      </Main>
      <PublicRoute render={() => <h1>404 Page not found</h1>} />
    </Switch>
  )
}
