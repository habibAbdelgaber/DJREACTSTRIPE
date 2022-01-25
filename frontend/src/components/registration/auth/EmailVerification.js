import React, { useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';
import { api } from '../../../api/api';
import { Link } from 'react-router-dom';

export function EmailVerification() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { key } = useParams()
    console.log(key)
    // const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        axios.post(api.auth.emailVerification, { key })
            .then(res => {
                setSuccess(true)
                // navigate('/login')
            })
            .finally(() => setLoading(false))
    }
    return (
        <Row className='mt-3'>
            <Col xs={12} md={6}>
                <p className='fs-5 py-3'>Please verify you account to login!</p>
                {success && <p role='alert' className='bg-info text-white py-2'>Your email was verified! You can go and login now</p>}
                {loading && 'verifying.....'}
                <form onSubmit={handleSubmit}>
                    <div className='d-grid'>
                        <Button type='submit' variant='primary' className='fs-5'>Verify email</Button>
                    </div>
                </form>
            </Col>
        </Row>
    )
}
