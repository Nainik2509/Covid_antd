import React from 'react'
import { useDispatch } from 'react-redux'
import { Badge, Card, CardHeader } from 'reactstrap'
import { handleLogOut } from '../redux/actions/auth'
import { AppDispatch } from '../redux/reducers/rootReducers'
import { notifySuccess } from '../utils/toaster'

const Header = () => {
  const dispatch: AppDispatch = useDispatch()

  const handleLogOutClick = () => {
    dispatch(handleLogOut()).then((data) => {
      if (data) {
        notifySuccess({
          header: 'Success',
          message: 'Logout successfully.',
        })
      }
    })
  }

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="d-flex justify-content-end">
          <Badge
            color="info"
            pill
            onClick={() => {
              handleLogOutClick()
            }}
          >
            Logout
          </Badge>
        </CardHeader>
      </Card>
    </React.Fragment>
  )
}

export default Header
