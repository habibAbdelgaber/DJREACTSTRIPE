import React, { useContext } from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import { AuthContext } from '../../context/authContext'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../api/api';

export function NavBar() {
    const { logout, user } = useContext(AuthContext)
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        axios.post(api.auth.logout)
            .then(res => logout())
        navigate('/')
    }
    return (
        <Navbar bg="dark" expand="lg" className='py-3'>
            <Container>
                <Navbar.Brand className='text-white'><Link to='/' className='text-decoration-none text-white'>Home</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user ? (
                            <>
                                <Button variant='danger' onClick={handleSubmit}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link>
                                    <Link to="/login" className='px-3 text-white text-decoration-none'>Log In</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/register" className='px-3 text-white text-decoration-none'>Sign Up</Link>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
