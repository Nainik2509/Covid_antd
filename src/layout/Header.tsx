import React from 'react'
import { Layout, Dropdown, Menu, Button, Avatar } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogOut } from '../redux/actions/auth'
import { AppDispatch, RootState } from '../redux/reducers/rootReducers'
import { notifySuccess } from '../utils/toaster'

const { Header: AntHeader } = Layout

type THeaderProps = {
  collapsed: boolean
  toggle: () => void
}

const Header: React.FC<THeaderProps> = ({ collapsed, toggle }) => {
  const dispatch: AppDispatch = useDispatch()

  const authUser = useSelector((state: RootState) => state.authReducer.userData)
  console.log(authUser)

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
  const menu = (
    <Menu>
      <Menu.Item>
        <Button
          block
          onClick={() => {
            handleLogOutClick()
          }}
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <AntHeader className="site-layout-background">
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <Avatar className="header-avatar-list" icon={<UserOutlined />} />
      </Dropdown>
      <div className="user-details-horizontal">
        <div>{authUser && authUser.email}</div>
      </div>
    </AntHeader>
  )
}

export default Header
