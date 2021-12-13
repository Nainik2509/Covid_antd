import { Col, Dropdown, Row, Table, Tag, Menu, Button, Input } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  DeleteTwoTone,
  EyeTwoTone,
  EditTwoTone,
  DownOutlined,
  SearchOutlined,
} from '@ant-design/icons'
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
import DataDetailModel from './DataDetailModel'

const MySwal = withReactContent(Swal)

type TAction = {
  record: covidObj
  handleDelete: (record: covidObj) => Promise<void>
}

const DataList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()

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

  const authUser = useSelector((state: RootState) => state.authReducer.userData)
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
        {authUser && authUser.role === 'Admin' && (
          <EditTwoTone
            className="button-datalist cursor-pointer"
            twoToneColor="#ff6205"
            onClick={() => history.push(`/edit-survey/${record.id}`)}
          />
        )}
        <EyeTwoTone
          className="button-datalist cursor-pointer"
          twoToneColor="#1890ff"
          onClick={() => {
            setDataDetailModel(true)
            setCurrentData(record)
          }}
        />
        {authUser && authUser.role === 'Admin' && (
          <DeleteTwoTone
            className="button-datalist cursor-pointer"
            twoToneColor="#dc3545"
            onClick={() => handleDelete(record)}
          />
        )}
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = ({ key }: any): void => {
    if (key) setParsedFilter({ ...parsedFilter, perPage: key })
  }
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="10">10</Menu.Item>
      <Menu.Item key="15">15</Menu.Item>
      <Menu.Item key="20">20</Menu.Item>
      <Menu.Item key="50">50</Menu.Item>
    </Menu>
  )

  type TCustomHeader = {
    rowsPerPage: number
    total: number
    search: string
    setParsedFilter: React.Dispatch<React.SetStateAction<ParsedFilter>>
  }

  const CustomHeader: React.FC<TCustomHeader> = (props) => (
    <Row justify="end" align="middle">
      <Col flex={2}>
        <Row justify="end" align="middle">
          <Row justify="end" align="middle" gutter={[15, 0]}>
            <Col flex="auto">
              <Dropdown overlay={menu}>
                <Button
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="align-middle mx-50">
                    {`${props.rowsPerPage} of ${props.total}`}
                  </span>
                  <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
            <Col flex="auto">
              <Input
                value={props.search}
                size="small"
                prefix={<SearchOutlined />}
                autoFocus
                onChange={(e) => {
                  if (e) {
                    setParsedFilter({ ...parsedFilter, search: e.target.value })
                  } else {
                    setParsedFilter({ ...parsedFilter, search: '' })
                  }
                }}
              />
            </Col>
          </Row>
          {/* <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
          <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col> */}
        </Row>
      </Col>
    </Row>
  )

  return (
    <div className="table-responsive">
      <Table<covidObj>
        dataSource={dataList}
        columns={columns}
        rowKey="id"
        loading={dataListLoading}
        size="middle"
        title={() => (
          <CustomHeader
            rowsPerPage={parsedFilter.perPage}
            total={dataCount}
            search={parsedFilter.search}
            setParsedFilter={setParsedFilter}
          />
        )}
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
          showSizeChanger: false,
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
