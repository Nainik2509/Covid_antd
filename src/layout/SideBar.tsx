import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
const { Sider } = Layout
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'

type TSideBarProps = {
  collapsed: boolean
  toggle: () => void
}

const SideBar: React.FC<TSideBarProps> = ({ collapsed, toggle }) => {
  let { pathname } = useLocation()
  pathname = pathname.replace('/', '')

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="60"
      onCollapse={() => {
        toggle()
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <PerfectScrollbar>
        <div className="logo">COVID</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
          <Menu.Item key="dashboard" icon={<UserOutlined />}>
            <NavLink style={{ textDecoration: 'none' }} to="/dashboard">
              <span className="label">Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="survey-list" icon={<VideoCameraOutlined />}>
            <NavLink style={{ textDecoration: 'none' }} to="/survey-list">
              <span className="label">Survey List</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="add-survey" icon={<UploadOutlined />}>
            <NavLink style={{ textDecoration: 'none' }} to="/add-survey">
              <span className="label">Your Survey</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </PerfectScrollbar>
    </Sider>
  )
}

export default SideBar
