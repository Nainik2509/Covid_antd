import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import classnames from 'classnames'
import {
  MIN_LENGTH,
  REQUIRED_ERROR,
  REQUIRED_TYPE,
} from '../../utils/Utilities'

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
import { handleLogin } from '../../redux/actions/auth'
import { useHistory } from 'react-router'
import { AppDispatch } from '../../redux/reducers/rootReducers'
import { notifySuccess } from '../../utils/toaster'
import { useDispatch } from 'react-redux'

// Types checking for form
type InputFormTypes = {
  email: string
  password: string
}

const Login = () => {
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()

  // Initial Values for form
  const initialValues = {
    email: '',
    password: '',
  }

  // Yup Validations schema
  const ValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email Id.')
      .typeError(REQUIRED_TYPE('Email', 'a valid mail.'))
      .required(REQUIRED_ERROR('Email')),
    password: yup
      .string()
      .typeError(REQUIRED_TYPE('Password', 'a string'))
      .min(6, MIN_LENGTH('Password', 6))
      .required(REQUIRED_ERROR('Password')),
  })

  // React-Hook-Form COnfiguration
  const {
    getValues,
    handleSubmit,
    control, //This object contains methods for registering components into React Hook Form.
    trigger, // Use for manually triggering errors
    formState: { errors, isDirty, isValid },
  } = useForm<InputFormTypes>({
    mode: 'all', // ['onBlur','onChange','onSubmit','all'] --> 	Validation will trigger on the blur and change events.
    reValidateMode: 'onChange', // [onChange | onBlur | onSubmit] --> inputs with errors get re-validated
    defaultValues: { ...initialValues }, // Passing default values to form
    resolver: yupResolver(ValidationScheme), // Form Validations
  })

  // Handle Submit Event
  const onSubmit = () => {
    trigger()
    if (isDirty && isValid) {
      dispatch(handleLogin(getValues())).then((data) => {
        if (data) {
          notifySuccess({
            header: 'Success',
            message: 'User login successfully.',
          })
          history.push('/dashboard')
        }
      })
    }
  }

  return (
    <React.Fragment>
      <Card
        className="mx-auto justify-content-center mt-5"
        style={{ maxWidth: '400px' }}
      >
        <CardHeader className="d-flex justify-content-center font-weight-bolder">
          Login
        </CardHeader>
        <CardBody className="p-5">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Label>Enter your email Id</Label>
              <FormGroup>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="Enter your email Id"
                      {...field}
                      className={classnames({
                        'is-invalid': errors['email'],
                      })}
                    />
                  )}
                />
                {errors && errors.email && errors.email.message && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                )}
              </FormGroup>
            </Row>
            <Row>
              <Label>Enter your email Id</Label>
              <FormGroup>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className={classnames({
                        'is-invalid': errors['password'],
                      })}
                    />
                  )}
                />
                {errors && errors.password && errors.password.message && (
                  <FormFeedback>{errors.password.message}</FormFeedback>
                )}
              </FormGroup>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end">
                <Button outline color="primary" className="round">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default Login as React.FC
