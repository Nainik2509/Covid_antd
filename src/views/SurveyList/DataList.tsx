import { Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ParsedFilter } from '../../helpers/common-types'
import {
  deleteCovidSurvey,
  getAllCovidSurvey,
} from '../../redux/actions/covidSurvey'
import { covidObj } from '../../redux/actions/covidSurvey/covidSurvey-types'
import { AppDispatch, RootState } from '../../redux/reducers/rootReducers'
import {
  CANCELLED_DELETE_TEXT,
  CANCELLED_DELETE_TITLE,
  DELETE_SUCCESS_TEXT,
  DELETE_TEXT,
  DELETE_TITLE,
  tagColor,
} from '../../utils/utilities'
import { DeleteTwoTone, EyeTwoTone } from '@ant-design/icons'
import DataDetailModel from './DataDetailModel'

const MySwal = withReactContent(Swal)

type TAction = {
  record: covidObj
  handleDelete: (record: covidObj) => Promise<void>
}

const DataList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const [parsedFilter, setParsedFilter] = useState<ParsedFilter>({
    page: 1,
    perPage: 10,
    search: '',
  })
  const [dataListLoading, setDataListLoading] = useState<boolean>(false)
  const [dataDetailModel, setDataDetailModel] = useState<boolean>(false)
  const [currentData, setCurrentData] = useState<covidObj | null>(null)

  const dataList: covidObj[] = useSelector(
    (state: RootState) => state.covidSurveyReducer.covidSurveyList
  )

  //   const totalPages = useSelector(
  //     (state: RootState) => state.covidSurveyReducer.totalPages
  //   )
  const dataCount = useSelector(
    (state: RootState) => state.covidSurveyReducer.count
  )

  useEffect(() => {
    setDataListLoading(true)
    dispatch(getAllCovidSurvey(parsedFilter)).then(() =>
      setDataListLoading(false)
    )
  }, [parsedFilter, dispatch])

  // On Delete Confirmation Alert
  const handleDelete = (record: covidObj) => {
    return MySwal.fire({
      title: DELETE_TITLE,
      text: DELETE_TEXT('user covid survey'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(function (result) {
      // Success Handler
      if (result.value) {
        dispatch(deleteCovidSurvey(record.id)).then((data) => {
          if (data) {
            MySwal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: DELETE_SUCCESS_TEXT('User covid survey'),
            })
            setDataListLoading(true)
            dispatch(getAllCovidSurvey(parsedFilter)).then(() =>
              setDataListLoading(false)
            )
          } else {
            MySwal.fire({
              title: 'Cancelled',
              text: CANCELLED_DELETE_TEXT('User covid survey'),
              icon: 'error',
            })
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        // Denied Handler
        MySwal.fire({
          title: CANCELLED_DELETE_TITLE,
          text: CANCELLED_DELETE_TEXT('user covid survey'),
          icon: 'error',
        })
      }
    })
  }

  // Action Components
  const ActionComponent: React.FC<TAction> = ({ record, handleDelete }) => {
    return (
      <div>
        <EyeTwoTone
          className="button-datalist cursor-pointer"
          twoToneColor="#1890ff"
          onClick={() => {
            setDataDetailModel(true)
            setCurrentData(record)
          }}
        />
        <DeleteTwoTone
          className="button-datalist cursor-pointer"
          twoToneColor="#dc3545"
          onClick={() => handleDelete(record)}
        />
      </div>
    )
  }

  const columns: ColumnsType<covidObj> = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text) => <div title={text}>{text}</div>,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      render: (text) => <div title={text}>{text}</div>,
    },
    {
      title: 'Age Group',
      dataIndex: 'age_group',
      key: 'age_group',
      align: 'center',
      render: (age_group) => (
        <span>
          <Tag color={tagColor[age_group]}>{age_group}</Tag>
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      align: 'center',
      render: (record: covidObj) => (
        <ActionComponent record={record} handleDelete={handleDelete} />
      ),
    },
  ]

  return (
    <div className="table-responsive">
      <Table<covidObj>
        dataSource={dataList}
        columns={columns}
        rowKey="id"
        loading={dataListLoading}
        size="middle"
        pagination={{
          position: ['bottomCenter'],
          total: dataCount,
          showTotal: (total: number, range: [number, number]): ReactNode =>
            `${range[0]}-${range[1]} of ${total} items`,
          current: parsedFilter.page,
          onChange: (page: number) => {
            setParsedFilter({ ...parsedFilter, page })
          },
          pageSize: parsedFilter.perPage,
          pageSizeOptions: ['10', '15', '20', '50'],
          responsive: true,
          showSizeChanger: true,
          onShowSizeChange: (current: number, size: number) => {
            setParsedFilter({ ...parsedFilter, perPage: size })
          },
        }}
      />
      <DataDetailModel
        dataDetailModel={dataDetailModel}
        setDataDetailModel={setDataDetailModel}
        currentData={currentData}
      />
    </div>
  )
}

export default DataList
