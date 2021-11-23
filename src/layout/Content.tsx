import React from 'react'
import { Layout } from 'antd'
const { Content } = Layout

type TMainProps = {
  children: React.ReactNode
}

const ContentSection: React.FC<TMainProps> = ({ children }) => {
  return (
    <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
      <div className="site-layout-background" style={{ padding: 24 }}>
        {children}
      </div>
    </Content>
  )
}

export default ContentSection
