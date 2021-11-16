import * as yup from 'yup'
import moment from 'moment'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { REQUIRED_ERROR, REQUIRED_TYPE } from '../../utils/Utilities'
import { getData } from '../../redux/actions/country'
import { RootState } from '../../redux/reducers/rootReducers'
import { CountryObj } from '../../redux/actions/country/country-types'

// Types checking for form
type InputFormTypes = {
  first_name: string
  last_name: string
  age_group: string
  date: string
  country_of_origin: number | null
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
  const dispatch = useDispatch()

  // Initial Values for form
  const initialValues = {
    first_name: '',
    last_name: '',
    age_group: '',
    date: '',
    country_of_origin: null,
  }

  const ageGroup = ['0 - 17', '18 - 35', '36 - 58', '59 - 70', '71 and above']

  const [parsedFilter, setParsedFilter] = useState<ParsedFilter>({
    page: 0,
    perPage: 20,
    search: '',
  })

  // useEffect for countrylisting
  useEffect(() => {
    dispatch(getData(parsedFilter))
  }, [parsedFilter])

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
    date: yup
      .date()
      .typeError(REQUIRED_TYPE('Date', 'selected'))
      .max(new Date(), "Date can't be in future!")
      .required(REQUIRED_ERROR('Valid Date')),
    country_of_origin: yup
      .number()
      .typeError(REQUIRED_TYPE('Country of origin', 'selected'))
      .required(REQUIRED_ERROR('Country of origin')),
  })

  // React-Hook-Form COnfiguration
  const {
    getValues,
    handleSubmit,
    setValue,
    control, //This object contains methods for registering components into React Hook Form.
    trigger, // Use for manually triggering errors
    formState: { errors },
  } = useForm<InputFormTypes>({
    mode: 'all', // ['onBlur','onChange','onSubmit','all'] --> 	Validation will trigger on the blur and change events.
    reValidateMode: 'onChange', // [onChange | onBlur | onSubmit] --> inputs with errors get re-validated
    defaultValues: { ...initialValues }, // Passing default values to form
    resolver: yupResolver(ValidationScheme), // Form Validations
  })

  // Handle Submit Event
  const onSubmit = () => {
    trigger()
  }

  // Rendering Country Select Field
  const renderCountryOption = (countryObj: CountryObj): SelectCountry => {
    return { label: countryObj.name, value: countryObj.id }
  }

  console.log(getValues())
  return (
    <Card className="m-5">
      <CardHeader className="d-flex justify-content-center font-weight-bolder">
        COVID SURVEY FORM
      </CardHeader>
      <CardBody className="p-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Label>Enter your first name</Label>
              <FormGroup>
                <Controller
                  control={control}
                  name="first_name"
                  render={({ field }) => (
                    <Input
                      placeholder="Enter your first name"
                      {...field}
                      className={classnames({
                        'is-invalid': errors['first_name'],
                      })}
                    />
                  )}
                />
                {errors && errors.first_name && errors.first_name.message && (
                  <FormFeedback>{errors.first_name.message}</FormFeedback>
                )}
              </FormGroup>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Label>Enter your last name</Label>
              <FormGroup>
                <Controller
                  control={control}
                  name="last_name"
                  render={({ field }) => (
                    <Input
                      placeholder="Enter your last name"
                      {...field}
                      className={classnames({
                        'is-invalid': errors['last_name'],
                      })}
                    />
                  )}
                />
                {errors && errors.last_name && errors.last_name.message && (
                  <FormFeedback>{errors.last_name.message}</FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Label>
                Approximately when did you first hear about the COVID-19
                outbreak?
              </Label>
              <FormGroup>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <Flatpickr
                      {...field}
                      placeholder="Choose a date"
                      options={{
                        altInput: true,
                        altFormat: 'F j, Y',
                        dateFormat: 'Y-m-d',
                      }}
                      className={classnames({
                        'is-invalid': errors['date'],
                      })}
                      onChange={(date) => {
                        const dateToUpdate = moment(date[0]).format(
                          'YYYY-MM-DD'
                        )
                        field.onChange(dateToUpdate)
                      }}
                    />
                  )}
                />
                {errors && errors.date && errors.date.message && (
                  <FormFeedback>{errors.date.message}</FormFeedback>
                )}
              </FormGroup>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Label>Country of origin</Label>
              <FormGroup>
                <Controller
                  control={control}
                  name="country_of_origin"
                  render={({ field }) => (
                    <Select
                      placeholder="Select country of origin"
                      options={countryList.map(renderCountryOption)}
                      onInputChange={(type) => {
                        if (type) {
                          setParsedFilter({ ...parsedFilter, search: type })
                        } else {
                          setParsedFilter({ ...parsedFilter, search: '' })
                        }
                      }}
                      onChange={(selected) => {
                        if (selected) {
                          field.onChange(selected.value)
                        } else {
                          field.onChange(null)
                        }
                      }}
                      className={classnames({
                        'is-invalid': errors['country_of_origin'],
                      })}
                    />
                  )}
                />
                {errors &&
                  errors.country_of_origin &&
                  errors.country_of_origin.message && (
                    <FormFeedback>
                      {errors.country_of_origin.message}
                    </FormFeedback>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Label>Which age group do you fall under?</Label>
              <FormGroup>
                {ageGroup.map((data, i) => (
                  <Controller
                    key={i}
                    control={control}
                    name="age_group"
                    render={({ field }) => (
                      <div className="d-flex flex-column align-items-start">
                        <Label key={i} className="d-flex align-items-center">
                          <Input
                            type="radio"
                            {...field}
                            className={classnames({
                              'is-invalid': errors['age_group'],
                            })}
                            onChange={(e) =>
                              setValue('age_group', e.target.value)
                            }
                            defaultChecked={getValues('age_group') === data}
                            value={data}
                          />
                          <span style={{ marginLeft: '10px' }}>{data}</span>
                        </Label>
                      </div>
                    )}
                  />
                ))}
                {errors && errors.age_group && errors.age_group.message && (
                  <FormFeedback>{errors.age_group.message}</FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button
                outline
                color="primary"
                type="submit"
                onClick={() => onSubmit()}
                className="round"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default CovidForm
