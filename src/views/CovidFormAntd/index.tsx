import * as yup from 'yup'
import moment from 'moment'
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
  Checkbox,
  Typography,
  Rate,
} from 'antd'
const { Title, Text } = Typography
const { Content } = Layout
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  ageGroup,
  BooleanType,
  MIN_CHECKED,
  MIN_RATE,
  REQUIRED_ERROR,
  REQUIRED_TYPE,
  symptomsGroup,
} from '../../utils/Utilities'
import { getData } from '../../redux/actions/country'
import { AppDispatch, RootState } from '../../redux/reducers/rootReducers'
import { CountryObj } from '../../redux/actions/country/country-types'
import {
  addCovidSurvey,
  getCovidSurvey,
  updateCovidSurvey,
} from '../../redux/actions/covidSurvey'
import { notifySuccess } from '../../utils/toaster'
import '../../assets/css/form_styles.css'

// Types checking for form
type InputFormTypes = {
  first_name: string
  last_name: string
  age_group: string
  infected: boolean
  symptoms: string[]
  awareness: number
  limitations: number
  detect: number
  hospitals: number
  healthcare: number
  treatment: number
  out_break: string
  countryId: number | null
}

type SelectCountry = {
  label: string
  value: number
}

type ParsedFilter = {
  page: number
  perPage: number
  search: string
}

const CovidForm = () => {
  const dispatch: AppDispatch = useDispatch()

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

  const [addNew, setAddNew] = useState(true)

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
        .min(1, MIN_CHECKED('Symptoms', 1))
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCovidSurvey, reset])

  // Handle Submit Event
  const onSubmit = () => {
    trigger()
    if (isValid) {
      if (addNew) {
        dispatch(addCovidSurvey(getValues())).then((data) => {
          if (data) {
            notifySuccess({
              header: 'Success',
              message: 'Your survey has been submitted.',
            })
          }
        })
      } else if (userCovidSurvey) {
        dispatch(updateCovidSurvey(userCovidSurvey.id, getValues())).then(
          (data) => {
            if (data) {
              notifySuccess({
                header: 'Success',
                message: 'Your survey has been updated.',
              })
              dispatch(getCovidSurvey())
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

  return (
    <Content style={{ padding: '15px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '50px' }}>
        Health Care Survey-Corona Virus (COVID-19) Awareness Survey
      </Title>
      <Form onFinish={handleSubmit(onSubmit)} className="row-col">
        <Row gutter={[48, 0]}>
          <Col xs={12} sm={24} md={12} lg={12} xl={12}>
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
          <Col xs={12} sm={24} md={12} lg={12} xl={12}>
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
          <Col xs={12} sm={24} md={12} lg={12} xl={12}>
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
          <Col xs={12} sm={24} md={12} lg={12} xl={12}>
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
          <Col xs={12} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              className="username"
              label="Approximately when did you first heaWhich age group do you fall under?"
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
        </Row>
        <Row gutter={[48, 0]}>
          <Col xs={12} sm={24} md={12} lg={12} xl={12}>
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
                    <Space direction="vertical">
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
          {watchInfected && (
            <Col xs={12} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="username"
                label="What are the main symptoms of the virus? (Check all that apply)"
                colon={false}
                name="symptoms"
                validateStatus={
                  errors && errors['symptoms'] ? 'error' : 'success'
                }
                help={errors.symptoms && (errors.symptoms as any).message}
              >
                <Controller
                  control={control}
                  name="symptoms"
                  render={({ field }) => (
                    <Checkbox.Group {...field} style={{ width: '100%' }}>
                      <Row style={{ width: '100%' }}>
                        {symptomsGroup.map((data, i) => (
                          <Col key={i} span={8}>
                            <Checkbox value={data}>{data}</Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Checkbox.Group>
                  )}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row gutter={[48, 0]} style={{ width: '100%' }}>
          <Col style={{ width: '100%' }}>
            <Title level={3}>
              {`Rate your country's Health Department in the following aspects:`}
            </Title>
            <Row>
              <Col span={8}>
                <Text strong>Health and hygiene awareness</Text>
              </Col>
              <Col span={16}>
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
            </Row>
            <Row>
              <Col span={8}>
                <Text strong>Travel limitations</Text>
              </Col>
              <Col span={16}>
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
            </Row>
            <Row>
              <Col span={8}>
                <Text strong>Screening and tests to detect the virus</Text>
              </Col>
              <Col span={16}>
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
            </Row>
            <Row>
              <Col span={8}>
                <Text strong>Availability of hospitals</Text>
              </Col>
              <Col span={16}>
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
            </Row>
            <Row>
              <Col span={8}>
                <Text strong>Availability of healthcare professionals</Text>
              </Col>
              <Col span={16}>
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
            </Row>
            <Row>
              <Col span={8}>
                <Text strong>Quality of treatment</Text>
              </Col>
              <Col span={16}>
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
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={18} className="d-flex justify-content-end">
            <Button type="primary" shape="round" htmlType="submit">
              {addNew ? 'Submit' : 'Update'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Content>
  )
}

export default CovidForm as React.FC
