import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router';
import { api } from '../../../api/api';

const PasswordResetConfirmSchema = Yup.object().shape({
    new_password1: Yup.string()
        .min(6, 'Password is too short!')
        .max(50, 'Password is too long!')
        .required('Required'),
    new_password2: Yup.string()
        .min(6, 'Password is too short!')
        .max(50, 'Password is too long!')
        .required('Required')
});

export function PasswordResetConfirm() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    function handleSubmit(values) {
        // console.log(values)
        axios.post(api.auth.resetPasswordConfirm, values)
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
                    <h1>Enter new password</h1>
                    {success && 'Your account was created. go and login now!'}
                    <Formik
                        initialValues={{
                            new_password1: '',
                            new_password2: '',
                        }}
                        validationSchema={PasswordResetConfirm}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field type='password' name="new_password1" className='form-control py-3' placeholder='Your e-mail address' />
                                {errors.new_password1 && touched.new_password1 ? (
                                    <div>{errors.new_password1}</div>
                                ) : null}
                                <Field type='password' name="new_password2" className='form-control mt-1 py-3' placeholder='Repeat Password' />
                                {errors.new_password2 && touched.new_password2 ? (
                                    <div>{errors.new_password2}</div>
                                ) : null}
                                <div className="d-grid">
                                    <Button variants='primary' className='mt-1 text-uppercase' type="submit" size='lg'>Password reset confirm</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </div>
        </Row>
    )
}

