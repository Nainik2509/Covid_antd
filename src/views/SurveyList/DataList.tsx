import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ParsedFilter } from '../../helpers/common-types'
import { getAllCovidSurvey } from '../../redux/actions/covidSurvey'
import { covidObj } from '../../redux/actions/covidSurvey/covidSurvey-types'
import { AppDispatch, RootState } from '../../redux/reducers/rootReducers'

const DataList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const [parsedFilter, setParsedFilter] = useState<ParsedFilter>({
    page: 1,
    perPage: 10,
    search: '',
  })
  const [dataListLoading, setDataListLoading] = useState<boolean>(false)

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

  const columns: ColumnsType<covidObj> = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
  ]

  return (
    <div>
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
    </div>
  )
}

export default DataList
