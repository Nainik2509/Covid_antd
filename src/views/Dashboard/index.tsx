import { Col, Row } from 'antd'
import InfectedPieChart from './InfectedPieChart'

const DashBoard = () => {
  return (
    <div className="dashboard-layout">
      <Row gutter={[48, 10]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <InfectedPieChart />
        </Col>
        {/* <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <InfectedPieChart />
        </Col> */}
      </Row>
    </div>
  )
}

export default DashBoard
