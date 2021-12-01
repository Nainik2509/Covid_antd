import {
  DashboardActions,
  IAction,
  InitialState,
} from '../../actions/dashboard/dashboard-types'

const initialState: InitialState = {
  infectedStats: { infectedCount: 0, notInfectedCount: 0 },
}

const DashboardReducer = (
  state: InitialState = initialState,
  action: IAction
): InitialState => {
  switch (action.type) {
    case DashboardActions.GET_INFECTED_STATS:
      return {
        ...state,
        infectedStats: action.payload,
      }
    default:
      return state
  }
}
export default DashboardReducer
