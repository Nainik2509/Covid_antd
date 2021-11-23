import React, { useState } from 'react'
import { Layout } from 'antd'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '../redux/reducers/rootReducers'
import Header from './Header'
import SideBar from './SideBar'
import ContentSection from './Content'
import FooterSection from './Footer'

type TMainProps = {
  children: React.ReactNode
}

const Main: React.FC<TMainProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const authToken = useSelector((state: RootState) => state.authReducer.token)
  if (!authToken || authToken === '') return <Redirect to="/login" />

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <React.Fragment>
      <Layout>
        <SideBar collapsed={collapsed} />
        <Layout className="site-layout">
          <Header collapsed={collapsed} toggle={toggle} />
          <ContentSection>{children}</ContentSection>
          <FooterSection />
        </Layout>
      </Layout>
    </React.Fragment>
  )
}

export default Main
