import React from 'react'
import { Container } from 'react-bootstrap'
import { AuthContextProvider } from '../../context/authContext'
import { Footer } from './Footer'
import { NavBar } from './Navbar'
export function Layout({ children }) {
    return (
        <AuthContextProvider>
            <NavBar />
            <Container>
                <div style={{ minHeight: '90vh' }}>
                    {children}
                </div>
            </Container>
            <Footer />
        </AuthContextProvider>
    )
}
