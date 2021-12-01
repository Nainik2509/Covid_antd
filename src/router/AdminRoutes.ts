import React from 'react'

const adminRoutes = [
  {
    path: '/dashboard',
    exact: true,
    component: React.lazy(() => import('../views/Dashboard')),
  },
  {
    path: '/edit-survey/:id',
    exact: true,
    component: React.lazy(() => import('../views/EditCovidFormAntd')),
  },
  {
    path: '/survey-list',
    exact: true,
    component: React.lazy(() => import('../views/SurveyList')),
  },
]

export default adminRoutes
