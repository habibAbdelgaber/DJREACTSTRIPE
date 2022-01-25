import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../../context/authContext';
import { api } from '../../../api/api';
import axios from 'axios'
import { useNavigate } from 'react-router';

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password is too short!')
    .max(50, 'Password is too long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export function Login() {
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  function handleSubmit(values) {
    axios.post(api.auth.login, values)
      .then((res) => {
        login(res.data.key)
        // console.log(res)
        setLoading(true)
        navigate('/')
      })
      .finally(setLoading(false))
  }
  return (
    <Row className="justify-content-md-center mt-5">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <Col xs={12} md={6}>
          {/* <h1 className='ps-1'>Log In</h1> */}
          {loading && 'Submitting...'}
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field type='email' name="email" className='form-control py-3' placeholder='Your e-mail address' />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <Field type='password' name="password" className='form-control mt-1 py-3' placeholder='Password' />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <div className="d-grid">
                  <Button variants='primary' className='mt-1' type="submit" size='lg'>Log in</Button>
                </div>
              </Form>
            )}
          </Formik>
          <p className='fs-6 pt-3'>Forgot you password? <Link to='/accounts/password/reset' className='text-decoration-none'>Reset Password</Link></p>
          <p className='fs-6'>Don't have an account? <Link to='/register' className='text-decoration-none'>Sign up</Link></p>
        </Col>
      </div>
    </Row>
  )
}
