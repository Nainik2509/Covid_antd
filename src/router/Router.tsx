import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Main from '../layout/Main'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const LoginPage = React.lazy(() => import('../views/LoginAntd'))
const CovidForm = React.lazy(() => import('../views/CovidFormAntd'))
const Dashboard = React.lazy(() => import('../views/Dashboard'))
const SurveyList = React.lazy(() => import('../views/SurveyList'))

export const Router = () => {
  return (
    <Switch>
      <PublicRoute exact path="/" component={LoginPage} />
      <PublicRoute exact path="/login" component={LoginPage} />
      <Main>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/survey-list" component={SurveyList} />
        <PrivateRoute exact path="/add-survey" component={CovidForm} />
        <Redirect from="*" to="/dashboard" />
      </Main>
      <PublicRoute render={() => <h1>404 Page not found</h1>} />
    </Switch>
  )
}
