import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ParsedFilter } from '../../helpers/common-types'
import { getAllCovidSurvey } from '../../redux/actions/covidSurvey'
import { covidObj } from '../../redux/actions/covidSurvey/covidSurvey-types'
import { AppDispatch, RootState } from '../../redux/reducers/rootReducers'

const DataList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [parsedFilter, setParsedFilter] = useState<ParsedFilter>({
    page: 0,
    perPage: 20,
    search: '',
  })
  const [dataListLoading, setDataListLoading] = useState<boolean>(false)

  const dataList: covidObj[] = useSelector(
    (state: RootState) => state.covidSurveyReducer.covidSurveyList
  )
  const totalPages = useSelector(
    (state: RootState) => state.covidSurveyReducer.totalPages
  )
  const count = useSelector(
    (state: RootState) => state.covidSurveyReducer.count
  )

  console.log(dataList, totalPages, count, dataListLoading)
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
  ]
  return (
    <div>
      <Table<covidObj> dataSource={dataList} columns={columns} rowKey="id" />
    </div>
  )
}

export default DataList
