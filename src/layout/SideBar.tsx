import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink } from 'react-router-dom'
const { Sider } = Layout
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'

type TSideBarProps = {
  collapsed: boolean
}

const SideBar: React.FC<TSideBarProps> = ({ collapsed }) => {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="logo">COVID</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <NavLink style={{ textDecoration: 'none' }} to="/dashboard">
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          <NavLink style={{ textDecoration: 'none' }} to="/survey-list">
            <span className="label">Survey List</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          <NavLink style={{ textDecoration: 'none' }} to="/add-survey">
            <span className="label">Your Survey</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideBar
