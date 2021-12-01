import API from '../../api'
import { DashboardActions, IAction } from './dashboard-types'
import { Dispatch } from 'redux'
import { DASHBOARD_GENERIC_API } from '../../apiEndPoints'

// ** API to Get Country Listing
export const getInfectedStats = () => {
  return async (dispatch: Dispatch<IAction>) => {
    return API.get(`${DASHBOARD_GENERIC_API}/infected/stats`).then(
      (response) => {
        if (response && response.status === 200) {
          dispatch({
            type: DashboardActions.GET_INFECTED_STATS,
            payload: response.data.data,
          })
          return true
        } else {
          return false
        }
      }
    )
  }
}
