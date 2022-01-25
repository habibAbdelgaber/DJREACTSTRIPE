import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router';
import { api } from '../../../api/api';

const SignupSchema = Yup.object().shape({
    password1: Yup.string()
        .min(6, 'Password is too short!')
        .max(50, 'Password is too long!')
        .required('Required'),
    password2: Yup.string()
        .min(6, 'Password is too short!')
        .max(50, 'Password is too long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export function Register() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    function handleSubmit(values) {
        // console.log(values)
        axios.post(api.auth.register, values)
            .then((res) => {
                setSuccess(true)
                setLoading(true)
                // navigate('/')
            })
            .finally(setLoading(false))
    }
    return (
        <Row className="justify-content-md-center mt-5">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <Col xs={12} md={6}>
                    <h1>Register now</h1>
                    {success && 'Your account was created. go and login now!'}
                    <Formik
                        initialValues={{
                            email: '',
                            password1: '',
                            password2: '',
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
                                <Field type='password' name="password1" className='form-control mt-1 py-3' placeholder='Password' />
                                {errors.password1 && touched.password1 ? (
                                    <div>{errors.password1}</div>
                                ) : null}
                                <Field type='password' name="password2" className='form-control mt-1 py-3' placeholder='Repeat Password' />
                                {errors.password2 && touched.password2 ? (
                                    <div>{errors.password2}</div>
                                ) : null}
                                <div className="d-grid">
                                    <Button variants='primary' className='mt-1 text-uppercase' type="submit" size='lg'>Sign up</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <p className='fs-4 py-2'>Already have an account? <Link to='/login'>Log In</Link></p>
                </Col>
            </div>
        </Row>
    )
}

