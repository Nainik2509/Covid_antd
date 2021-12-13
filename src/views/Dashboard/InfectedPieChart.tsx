import { Card, Col, Row, Typography } from 'antd'
const { Text } = Typography
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { getInfectedStats } from '../../redux/actions/dashboard'
import { AppDispatch, RootState } from '../../redux/reducers/rootReducers'

const InfectedPieChart = () => {
  const dispatch: AppDispatch = useDispatch()
  const [infectedArr, setInfectedArr] = useState([0])

  const options = {
      chart: {
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1,
        },
      },
      colors: ['#51e5a8'],
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '77%',
          },
          track: {
            background: '#ebe9f1',
            strokeWidth: '50%',
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              color: '#5e5873',
              fontFamily: 'Montserrat',
              fontSize: '2.86rem',
              fontWeight: '600',
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      grid: {
        padding: {
          bottom: 30,
        },
      },
    },
    series = infectedArr

  useEffect(() => {
    dispatch(getInfectedStats())
  }, [dispatch])

  const infectedStats = useSelector(
    (state: RootState) => state.dashboardReducer.infectedStats
  )

  useEffect(() => {
    const temp = +(
      (infectedStats.infectedCount /
        (infectedStats.infectedCount + infectedStats.notInfectedCount)) *
      100
    ).toFixed(2)
    if (temp) setInfectedArr([temp])
  }, [infectedStats])

  return (
    <div id="chart">
      <Card title="Infected Overview">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={245}
        />
        <Row className="border-top text-center mx-0">
          <Col className="border-right py-1" span={12}>
            <Text type="secondary" className="text-muted mb-0">
              Infected
            </Text>
            <h3 className="font-weight-bolder mb-0">
              {infectedStats.infectedCount}
            </h3>
          </Col>
          <Col className="py-1" span={12}>
            <Text type="secondary" className="text-muted mb-0">
              Not Infected
            </Text>
            <h3 className="font-weight-bolder mb-0">
              {infectedStats.notInfectedCount}
            </h3>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default InfectedPieChart
