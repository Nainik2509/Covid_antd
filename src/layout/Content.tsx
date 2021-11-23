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
      <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
        <div className="site-layout-background" style={{ padding: 24 }}>
          {children}
        </div>
      </Content>
    </PerfectScrollbar>
  )
}

export default ContentSection
