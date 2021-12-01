export enum DashboardActions {
  GET_INFECTED_STATS = 'GET_INFECTED_STATS',
}

export type InfectedStatsObj = {
  infectedCount: number
  notInfectedCount: number
}

type InfectedStats = {
  type: DashboardActions.GET_INFECTED_STATS
  payload: InfectedStatsObj
}

export type IAction = InfectedStats

export type InitialState = {
  infectedStats: InfectedStatsObj
}
