import moment from 'moment'
import { Badge, Descriptions, Modal, Rate, Tag } from 'antd'
import { covidObj } from '../../redux/actions/covidSurvey/covidSurvey-types'
import { tagColor } from '../../utils/utilities'

type TDataDetails = {
  dataDetailModel: boolean
  setDataDetailModel: React.Dispatch<React.SetStateAction<boolean>>
  currentData: covidObj | null
}

const DataDetailModel: React.FC<TDataDetails> = ({
  dataDetailModel,
  setDataDetailModel,
  currentData,
}) => {
  return (
    <Modal
      title="Covid Survey Details"
      centered
      visible={dataDetailModel}
      footer={null}
      width={600}
      onCancel={() => setDataDetailModel(false)}
    >
      <Descriptions
        column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        layout="vertical"
        size={'small'}
      >
        <Descriptions.Item label="First Name" span={1}>
          {currentData?.first_name}
        </Descriptions.Item>
        <Descriptions.Item label="last Name" span={1}>
          {currentData?.last_name}
        </Descriptions.Item>
        <Descriptions.Item
          label="Approximately when did you first hear about the COVID-19 outbreak"
          span={3}
        >
          {currentData && currentData.out_break
            ? moment(currentData.out_break).format('MMMM Do YYYY')
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Age group" span={1}>
          {currentData && currentData.age_group && (
            <Tag color={tagColor[currentData.age_group]}>
              {currentData.age_group}
            </Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Covid infectious" span={1}>
          {currentData && currentData.infected ? (
            <div className="badge-bg-error">
              <Badge count={'Infected'} />
            </div>
          ) : (
            <div className="badge-bg-success">
              <Badge count={'Not Infected'} />
            </div>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Health and hygiene awareness" span={1}>
          <Rate allowHalf disabled defaultValue={currentData?.awareness} />
        </Descriptions.Item>
        <Descriptions.Item label="Travel limitations" span={1}>
          <Rate allowHalf disabled defaultValue={currentData?.limitations} />
        </Descriptions.Item>
        <Descriptions.Item
          label="Screening and tests to detect the virus"
          span={1}
        >
          <Rate allowHalf disabled defaultValue={currentData?.detect} />
        </Descriptions.Item>
        <Descriptions.Item label="Availability of hospitals" span={1}>
          <Rate allowHalf disabled defaultValue={currentData?.hospitals} />
        </Descriptions.Item>
        <Descriptions.Item
          label="Availability of healthcare professionals"
          span={1}
        >
          <Rate allowHalf disabled defaultValue={currentData?.healthcare} />
        </Descriptions.Item>
        <Descriptions.Item label="Quality of treatment" span={1}>
          <Rate allowHalf disabled defaultValue={currentData?.treatment} />
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default DataDetailModel
