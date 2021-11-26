import React from 'react'
import { Layout } from 'antd'
import PerfectScrollbar from 'react-perfect-scrollbar'
const { Content } = Layout

type TMainProps = {
  children: React.ReactNode
}

const ContentSection: React.FC<TMainProps> = ({ children }) => {
  return (
    <PerfectScrollbar>
      <Content className="site-layout-content">
        <div className="site-layout-background site-layout-background-padding">
          {children}
        </div>
      </Content>
    </PerfectScrollbar>
  )
}

export default ContentSection
