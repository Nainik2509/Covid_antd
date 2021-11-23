import { Layout } from 'antd'
import { HeartFilled } from '@ant-design/icons'

const { Footer } = Layout

const FooterSection: React.FC = () => {
  return (
    <Footer
      className="site-layout-background"
      style={{ background: '#f2faff', textAlign: 'center' }}
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
  )
}

export default FooterSection
