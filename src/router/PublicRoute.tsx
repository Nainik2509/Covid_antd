import { useSelector } from 'react-redux'
import { RouteProps, Redirect, Route } from 'react-router-dom'
import { RootState } from '../redux/reducers/rootReducers'

type PublicRouteProps = RouteProps

const PublicRoute: React.FC<PublicRouteProps> = ({ ...rest }) => {
  const authToken = useSelector((state: RootState) => state.authReducer.token)
  if (authToken || authToken !== '') return <Redirect to="/dashboard" />
  return <Route {...rest} />
}

export default PublicRoute
