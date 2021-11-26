import { Layout } from 'antd'
import { HeartTwoTone } from '@ant-design/icons'

const { Footer } = Layout

const FooterSection: React.FC = () => {
  return (
    <Footer
      className="site-layout-background"
      style={{ background: '#f2faff', textAlign: 'center' }}
    >
      <div className="copyright">
        © {new Date().getFullYear()}, made with &nbsp;
        {<HeartTwoTone twoToneColor="#eb2f96" />} by&nbsp;
        <a href="/" className="font-weight-bold" target="_blank">
          Nainik Mehta &nbsp;
        </a>
        for a better web.
      </div>
    </Footer>
  )
}

export default FooterSection
