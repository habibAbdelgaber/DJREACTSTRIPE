import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Row, Col, Card } from 'react-bootstrap'
import { api } from '../../api/api'
import { NavLink } from 'react-router-dom'


export function JobDetail() {
    const [job, setJob] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        function getJob() {
            axios.get(api.jobs.retrieve(id))
                .then(res => setJob(res.data))

        }
        getJob()
    }, [id])
    return (
        <Row className='mt-3'>
            <Col xs={12} md={6}>
                {!job && 'Loading........'}
                {job && (
                    <>
                        <h2>{job.name}</h2>
                        <NavLink className='bg-primary p-2 px-4 text-white text-decoration-none' to={`/jobs/${id}/payment`}>Sponsor</NavLink>
                    </>
                )}
            </Col>
        </Row>
    )
}

