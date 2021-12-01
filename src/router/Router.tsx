import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Redirect, Route } from 'react-router-dom'
import Main from '../layout/Main'
import { RootState } from '../redux/reducers/rootReducers'
import adminRoutes from './AdminRoutes'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import userRoutes from './UserRoutes'

const LoginPage = React.lazy(() => import('../views/LoginAntd'))

export const Router = () => {
  const authUser = useSelector((state: RootState) => state.authReducer.userData)

  return (
    <Switch>
      <PublicRoute exact path="/" component={LoginPage} />
      <PublicRoute exact path="/login" component={LoginPage} />
      <Main>
        {authUser &&
          authUser.role === 'Admin' &&
          adminRoutes.map((item) => (
            <PrivateRoute
              key={item.path}
              path={item.path}
              exact={item.exact === true}
              component={item.component}
            />
          ))}
        {authUser &&
          authUser.role === 'User' &&
          userRoutes.map((item) => (
            <PrivateRoute
              key={item.path}
              path={item.path}
              exact={item.exact === true}
              component={item.component}
            />
          ))}
      </Main>
      <Route
        path="/404"
        exact
        component={React.lazy(() => import('../views/pages/Error'))}
      />
      <Route path="*">
        <Redirect to="/404" />
      </Route>
    </Switch>
  )
}
