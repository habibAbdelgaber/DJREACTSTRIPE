import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { api } from '../../../api/api';
import axios from 'axios'
import { useNavigate } from 'react-router';

const PasswordResetSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password is too short!')
    .max(50, 'Password is too long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export function PasswordReset() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState(null)
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(values)
    setLoading(true)
    axios.post(api.auth.resetPassword)
      .then((res) => {
        console.log(res.data.token)
        setSuccess(true)
      })
      .finally(setLoading(false))
  }
  return (
    <Row className="justify-content-md-center mt-5">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <Col xs={12} md={6}>
          {loading && 'Submitting....'}
          {success && 'We have sent an email to reset your password!'}
          <h1 className='ps-1'>Password reset</h1>
          <form onSubmit={handleSubmit}>
            <input
              className='form-control py-2'
              placeholder='Your e-mail address'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <button type='submit' className='btn btn-primary btn-lg mt-1'>Reset password</button>
          </form>
        </Col>
      </div>
    </Row>
  )
}


// export function PasswordReset() {
//   const [email, setEmail] = useState('')
//   const { key } = useParams()

//   function handleSubmit(e) {
//     e.preventDefault();
//     axios.post(api.auth.resetPassword, { key })
//       .then(res => {
//         console.log(res.data.key)
//       })
//       .catch(err => console.log(err.message))
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input placeholder='Your e-mail address' value={email} onChange={(e) => setEmail(e.target.value)} />
//         <button type='submit'>Reset password</button>
//       </form>
//     </div>
//   )
// }
