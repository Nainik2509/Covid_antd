import React from 'react'

const userRoutes = [
  {
    path: '/dashboard',
    exact: true,
    component: React.lazy(() => import('../views/Dashboard')),
  },
  {
    path: '/add-survey',
    exact: true,
    component: React.lazy(() => import('../views/CovidFormAntd')),
  },
]

export default userRoutes
