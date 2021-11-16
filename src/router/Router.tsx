
import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { RootState } from '../redux/reducers/rootReducers'
import PrivateRoute from './PrivateRoute'

const CovidForm = React.lazy<any>(() => import('../views/CovidForm'))
const LoginPage = React.lazy<any>(() => import('../views/Login'))

export const Router = () => {
    // Country Listing from store
    const userData = useSelector(
        (state: RootState) => state.authReducer.userData
    )
    return (
        <Switch>
            <Route exact path='/' component={LoginPage} />
            <Route exact path='/login' component={LoginPage} />
            <PrivateRoute exact path='/covid' component={CovidForm} />
            <Route render={() => <h1>404 Page not found</h1>} />
        </Switch>
    )
}
