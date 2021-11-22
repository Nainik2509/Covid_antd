import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Form, Input, Button, Layout, Row, Col, Typography } from 'antd'
const { Title } = Typography
const { Content } = Layout
import signinbg from '../../assets/images/img-signin.jpg'
import {
  MIN_LENGTH,
  REQUIRED_ERROR,
  REQUIRED_TYPE,
} from '../../utils/Utilities'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { AppDispatch } from '../../redux/reducers/rootReducers'
import { handleLogin } from '../../redux/actions/auth'
import { notifySuccess } from '../../utils/toaster'

// Types checking for form
type InputFormTypes = {
  email: string
  password: string
}

const LoginFormAntd = () => {
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
      .required(REQUIRED_ERROR('Password'))
      .min(6, MIN_LENGTH('Password', 6)),
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
    <Layout className="layout-default layout-signin">
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col className="my-auto">
            <Title className="mb-15">Sign In</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your email and password to sign in
            </Title>
            <Form
              onFinish={handleSubmit(onSubmit)}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="Email"
                name="email"
                hasFeedback={errors && errors['email'] ? true : false}
                validateStatus={errors && errors['email'] ? 'error' : 'success'}
                help={errors.email?.message}
              >
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email Id"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                className="username"
                label="Password"
                name="password"
                hasFeedback
                validateStatus={
                  errors && errors['password'] ? 'error' : 'success'
                }
                help={errors.password?.message}
              >
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                    />
                  )}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col className="sign-img" style={{ padding: 12 }}>
            <img src={signinbg} alt="" />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default LoginFormAntd as React.FC
