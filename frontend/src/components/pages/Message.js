import React from 'react'

export function Message({ variant, children }) {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}
