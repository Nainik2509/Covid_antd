import React, { useState } from 'react'
import { Layout, Menu } from 'antd'

const { Footer, Sider, Content } = Layout
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HeartFilled,
} from '@ant-design/icons'
import { NavLink, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/rootReducers'
import Header from './Header'

const Main: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const authToken = useSelector((state: RootState) => state.authReducer.token)
  if (!authToken || authToken === '') return <Redirect to="/login" />

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <React.Fragment>
      <Layout>
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
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header collapsed={collapsed} toggle={toggle} />
          <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
            <div className="site-layout-background" style={{ padding: 24 }}>
              {children}
            </div>
          </Content>
          <Footer
            className="site-layout-background"
            style={{ background: '#fafafa', textAlign: 'center' }}
          >
            <div className="copyright">
              © {new Date().getFullYear()}, made with
              {<HeartFilled />} by
              <a href="#pablo" className="font-weight-bold" target="_blank">
                Nainik Mehta
              </a>
              for a better web.
            </div>
          </Footer>
        </Layout>
      </Layout>
    </React.Fragment>
  )
}

export default Main
