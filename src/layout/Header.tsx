import React from 'react'
import { Layout, Dropdown, Menu, Button, Avatar } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { handleLogOut } from '../redux/actions/auth'
import { AppDispatch } from '../redux/reducers/rootReducers'
import { notifySuccess } from '../utils/toaster'

const { Header: AntHeader } = Layout

type THeaderProps = {
  collapsed: boolean
  toggle: () => void
}

const Header: React.FC<THeaderProps> = ({ collapsed, toggle }) => {
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
    <AntHeader
      className="site-layout-background"
      style={{
        padding: 0,
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <Avatar
          style={{
            backgroundColor: '#87d068',
            float: 'right',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '15px 40px ',
          }}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </AntHeader>
  )
}

export default Header
