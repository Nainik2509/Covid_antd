import moment from 'moment'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Form,
  Input,
  Layout,
  Row,
  Col,
  DatePicker,
  AutoComplete,
  Radio,
  Space,
  Button,
  // Checkbox,
  Typography,
  Rate,
  Select,
} from 'antd'

const { Title, Text } = Typography
const { Content } = Layout

import {
  ageGroup,
  BooleanType,
  MIN_RATE,
  MIN_SELECTED,
  REQUIRED_ERROR,
  REQUIRED_TYPE,
  symptomsGroup,
} from '../../utils/utilities'
import { getData } from '../../redux/actions/country'
import {
  addCovidSurvey,
  getCovidSurvey,
  updateCovidSurvey,
} from '../../redux/actions/covidSurvey'
import { AppDispatch, RootState } from '../../redux/reducers/rootReducers'
import { notifySuccess } from '../../utils/toaster'

import { CountryObj } from '../../redux/actions/country/country-types'
// Types checking for form
import { covidFormData as InputFormTypes } from '../../redux/actions/covidSurvey/covidSurvey-types'
import { ParsedFilter } from '../../helpers/common-types'

type SelectCountry = {
  label: string
  value: number
}

type SelectSymptoms = {
  label: string
  value: string
}

const CovidForm = () => {
  const dispatch: AppDispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)

  // Initial Values for form
  const initialValues = {
    first_name: '',
    last_name: '',
    age_group: '',
    awareness: 0,
    limitations: 0,
    detect: 0,
    hospitals: 0,
    healthcare: 0,
    treatment: 0,
    infected: false,
    symptoms: [],
    out_break: '',
    countryId: null,
  }

  const [parsedFilter, setParsedFilter] = useState<ParsedFilter>({
    page: 0,
    perPage: 20,
    search: '',
  })

  const [addNew, setAddNew] = useState<boolean>(true)

  const userCovidSurvey = useSelector(
    (state: RootState) => state.covidSurveyReducer.covidObj
  )

  // useEffect for countrylisting
  useEffect(() => {
    dispatch(getCovidSurvey())
  }, [dispatch])

  // useEffect for countrylisting
  useEffect(() => {
    dispatch(getData(parsedFilter))
  }, [parsedFilter, dispatch])

  // Country Listing from store
  const countryList = useSelector(
    (state: RootState) => state.countryReducer.countryList
  )

  // Yup Validations schema
  const ValidationScheme = yup.object().shape({
    first_name: yup
      .string()
      .typeError(REQUIRED_TYPE('First name', 'a string'))
      .required(REQUIRED_ERROR('First name')),
    last_name: yup
      .string()
      .typeError(REQUIRED_TYPE('Last name', 'a string'))
      .required(REQUIRED_ERROR('Last name')),
    age_group: yup
      .string()
      .typeError(REQUIRED_TYPE('Age group', 'selected'))
      .required(REQUIRED_ERROR('Age group')),
    infected: yup.boolean(),
    symptoms: yup.array(yup.string()).when('infected', {
      is: true,
      then: yup
        .array(yup.string())
        .typeError(REQUIRED_TYPE('Symptoms', 'selected'))
        .min(1, MIN_SELECTED('Symptoms', 1))
        .required(REQUIRED_ERROR('Symptoms')),
    }),
    out_break: yup
      .date()
      .typeError(REQUIRED_TYPE('Date', 'selected'))
      .max(new Date(), "Date can't be in future!")
      .required(REQUIRED_ERROR('Valid Date')),
    countryId: yup
      .number()
      .typeError(REQUIRED_TYPE('Country of origin', 'selected'))
      .required(REQUIRED_ERROR('Country of origin')),
    awareness: yup
      .number()
      .typeError(REQUIRED_TYPE('Awarness', 'rated'))
      .required(REQUIRED_ERROR('Awarness'))
      .min(0, MIN_RATE('Awarness', 1)),
    limitations: yup
      .number()
      .typeError(REQUIRED_TYPE('limitations', 'rated'))
      .required(REQUIRED_ERROR('limitations'))
      .min(0, MIN_RATE('limitations', 1)),
    detect: yup
      .number()
      .typeError(REQUIRED_TYPE('detect', 'rated'))
      .required(REQUIRED_ERROR('detect'))
      .min(0, MIN_RATE('detect', 1)),
    hospitals: yup
      .number()
      .typeError(REQUIRED_TYPE('hospitals', 'rated'))
      .required(REQUIRED_ERROR('hospitals'))
      .min(0, MIN_RATE('hospitals', 1)),
    healthcare: yup
      .number()
      .typeError(REQUIRED_TYPE('healthcare', 'rated'))
      .required(REQUIRED_ERROR('healthcare'))
      .min(0, MIN_RATE('healthcare', 1)),
    treatment: yup
      .number()
      .typeError(REQUIRED_TYPE('treatment', 'rated'))
      .required(REQUIRED_ERROR('treatment'))
      .min(0, MIN_RATE('treatment', 1)),
  })

  // React-Hook-Form COnfiguration
  const {
    getValues,
    handleSubmit,
    control, //This object contains methods for registering components into React Hook Form.
    trigger, // Use for manually triggering errors
    watch, // This will watch specified inputs and return their values.
    // resetField, // Reset an individual field state.
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<InputFormTypes>({
    mode: 'all', // ['onBlur','onChange','onSubmit','all'] --> 	Validation will trigger on the blur and change events.
    reValidateMode: 'onChange', // [onChange | onBlur | onSubmit] --> inputs with errors get re-validated
    defaultValues: { ...initialValues }, // Passing default values to form
    resolver: yupResolver(ValidationScheme), // Form Validations
  })

  const watchInfected = watch('infected')

  useEffect(() => {
    if (!watchInfected) {
      setValue('symptoms', [])
    }
  }, [watchInfected, setValue])

  useEffect(() => {
    if (userCovidSurvey) {
      setAddNew(false)
      reset({ ...userCovidSurvey })
      const temp = countryList
        .map(renderCountryOption)
        .find((id) => id.value === getValues('countryId'))
      if (!temp) {
        setParsedFilter((parsedFilter) => ({
          ...parsedFilter,
          search: `${getValues('countryId')}`,
        }))
      }
    } else {
      reset({ ...initialValues })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCovidSurvey, reset])

  // Handle Submit Event
  const onSubmit = () => {
    trigger()
    if (isValid) {
      if (addNew) {
        setLoading(true)
        dispatch(addCovidSurvey(getValues())).then((data) => {
          if (data) {
            setLoading(false)
            notifySuccess({
              header: 'Success',
              message: 'Your survey has been submitted.',
            })
          } else {
            setLoading(false)
          }
        })
      } else if (userCovidSurvey) {
        setLoading(true)
        dispatch(updateCovidSurvey(userCovidSurvey.id, getValues())).then(
          (data) => {
            if (data) {
              setLoading(false)
              notifySuccess({
                header: 'Success',
                message: 'Your survey has been updated.',
              })
              dispatch(getCovidSurvey())
            } else {
              setLoading(false)
            }
          }
        )
      }
    }
  }

  // Rendering Country Select Field
  const renderCountryOption = (countryObj: CountryObj): SelectCountry => {
    return { label: countryObj.name, value: countryObj.id }
  }

  // Rendering Country Select Field
  const renderSymptomsOption = (data: string): SelectSymptoms => {
    return { label: data, value: data }
  }
  return (
    <Content className="p-15">
      <Title level={3} className="covid-form-content-title">
        Health Care Survey-Corona Virus (COVID-19) Awareness Survey
      </Title>
      <Form onFinish={handleSubmit(onSubmit)} className="row-col">
        <Row gutter={[48, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              className="username"
              label="Enter your first name"
              name="first_name"
              hasFeedback={errors && errors['first_name'] ? true : false}
              validateStatus={
                errors && errors['first_name'] ? 'error' : 'success'
              }
              help={errors.first_name?.message}
            >
              <Controller
                control={control}
                name="first_name"
                render={({ field }) => (
                  <Input {...field} placeholder="Enter your first name" />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              className="username"
              label="Enter your last name"
              name="last_name"
              hasFeedback={errors && errors['last_name'] ? true : false}
              validateStatus={
                errors && errors['last_name'] ? 'error' : 'success'
              }
              help={errors.last_name?.message}
            >
              <Controller
                control={control}
                name="last_name"
                render={({ field }) => (
                  <Input {...field} placeholder="Enter your last name" />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[48, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              className="username"
              label="Approximately when did you first hear about the COVID-19 outbreak?"
              colon={false}
              name="out_break"
              hasFeedback={errors && errors['out_break'] ? true : false}
              validateStatus={
                errors && errors['out_break'] ? 'error' : 'success'
              }
              help={errors.out_break?.message}
            >
              <Controller
                control={control}
                name="out_break"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={field.value ? moment(field.value) : null}
                    placeholder="Choose a date"
                    format={(value) => `${value.format('MMMM Do YYYY')}`}
                    onChange={(date) => {
                      if (date) {
                        const dateToUpdate = moment(date).format('YYYY-MM-DD')
                        field.onChange(dateToUpdate)
                      } else {
                        field.onChange(null)
                      }
                    }}
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              className="username"
              label="Country of origin"
              name="countryId"
              hasFeedback={errors && errors['countryId'] ? true : false}
              validateStatus={
                errors && errors['countryId'] ? 'error' : 'success'
              }
              help={errors.countryId?.message}
            >
              <Controller
                control={control}
                name="countryId"
                render={({ field }) => (
                  <AutoComplete
                    {...field}
                    showSearch
                    options={
                      countryList && countryList.map(renderCountryOption)
                    }
                    value={
                      field.value && countryList
                        ? countryList
                            .map(renderCountryOption)
                            .find((id) => id.value === field.value)?.label
                        : undefined
                    }
                    onSearch={(type) => {
                      if (type) {
                        setParsedFilter({ ...parsedFilter, search: type })
                      } else {
                        // setParsedFilter({ ...parsedFilter, search: '' })
                        const temp = countryList
                          .map(renderCountryOption)
                          .find((id) => id.value === getValues('countryId'))
                        if (!temp || temp === undefined) {
                          setParsedFilter((parsedFilter) => ({
                            ...parsedFilter,
                            search: `${getValues('countryId')}`,
                          }))
                        }
                      }
                    }}
                    onSelect={(selected) => {
                      if (selected) {
                        field.onChange(selected)
                      } else {
                        field.onChange(null)
                      }
                    }}
                    defaultActiveFirstOption={false}
                  ></AutoComplete>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[48, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              className="username"
              label="Which age group do you fall under?"
              colon={false}
              name="age_group"
              validateStatus={
                errors && errors['age_group'] ? 'error' : 'success'
              }
              help={errors.age_group?.message}
            >
              <Controller
                control={control}
                name="age_group"
                render={({ field }) => (
                  <Radio.Group {...field}>
                    <Space direction="vertical">
                      {ageGroup.map((data, i) => (
                        <Radio key={i} value={data}>
                          {data}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              className="username"
              label="Are your covid infectious?"
              colon={false}
              name="infected"
              validateStatus={
                errors && errors['infected'] ? 'error' : 'success'
              }
              help={errors.infected?.message}
            >
              <Controller
                control={control}
                name="infected"
                render={({ field }) => (
                  <Radio.Group {...field}>
                    <Space>
                      {BooleanType.map((data, i) => (
                        <Radio key={i} value={data}>
                          {data ? 'Yes' : 'No'}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        {watchInfected && (
          <Row gutter={[48, 0]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                className="username"
                label="What are the main symptoms of the virus? (Select all that apply)"
                colon={false}
                name="symptoms"
                validateStatus={
                  errors && errors['symptoms'] ? 'error' : 'success'
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                help={errors.symptoms && (errors.symptoms as any).message}
              >
                <Controller
                  control={control}
                  name="symptoms"
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-100"
                      allowClear
                      autoClearSearchValue
                      showArrow
                      mode="multiple"
                      placeholder="Please select all that apply"
                      options={
                        symptomsGroup && symptomsGroup.map(renderSymptomsOption)
                      }
                    />

                    // <Checkbox.Group {...field}  className="w-100">
                    //   <Row className="w-100">
                    //     {symptomsGroup.map((data, i) => (
                    //       <Col key={i} xs={12} sm={12} md={6} lg={6} xl={6}>
                    //         <Checkbox value={data}>{data}</Checkbox>
                    //       </Col>
                    //     ))}
                    //   </Row>
                    // </Checkbox.Group>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={[48, 0]} className="w-100">
          <Row className="w-100 covid-form-rate-title">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Text mark>
                {`Rate your country's Health Department in the following aspects:`}
              </Text>
            </Col>
          </Row>
          <Row className="w-100 covid-form-rate-title py-0">
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Text keyboard>Health and hygiene awareness</Text>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                name="awareness"
                validateStatus={
                  errors && errors['awareness'] ? 'error' : 'success'
                }
                help={errors.awareness?.message}
              >
                <Controller
                  control={control}
                  name="awareness"
                  render={({ field }) => <Rate allowHalf {...field} />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Text keyboard>Travel limitations</Text>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                name="limitations"
                validateStatus={
                  errors && errors['limitations'] ? 'error' : 'success'
                }
                help={errors.limitations?.message}
              >
                <Controller
                  control={control}
                  name="limitations"
                  render={({ field }) => <Rate allowHalf {...field} />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Text keyboard>Screening and tests to detect the virus</Text>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                name="detect"
                validateStatus={
                  errors && errors['detect'] ? 'error' : 'success'
                }
                help={errors.detect?.message}
              >
                <Controller
                  control={control}
                  name="detect"
                  render={({ field }) => <Rate allowHalf {...field} />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Text keyboard>Availability of hospitals</Text>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                name="hospitals"
                validateStatus={
                  errors && errors['hospitals'] ? 'error' : 'success'
                }
                help={errors.hospitals?.message}
              >
                <Controller
                  control={control}
                  name="hospitals"
                  render={({ field }) => <Rate allowHalf {...field} />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Text keyboard>Availability of healthcare professionals</Text>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                name="healthcare"
                validateStatus={
                  errors && errors['healthcare'] ? 'error' : 'success'
                }
                help={errors.healthcare?.message}
              >
                <Controller
                  control={control}
                  name="healthcare"
                  render={({ field }) => <Rate allowHalf {...field} />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Text keyboard>Quality of treatment</Text>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                name="treatment"
                validateStatus={
                  errors && errors['treatment'] ? 'error' : 'success'
                }
                help={errors.treatment?.message}
              >
                <Controller
                  control={control}
                  name="treatment"
                  render={({ field }) => <Rate allowHalf {...field} />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col span={6} offset={18} className="d-flex justify-content-end">
            <Button
              type="primary"
              loading={loading}
              disabled={loading}
              shape="round"
              htmlType="submit"
              ghost
            >
              {addNew ? 'Submit' : 'Update'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Content>
  )
}

export default CovidForm as React.FC
