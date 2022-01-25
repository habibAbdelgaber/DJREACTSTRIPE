import React from 'react'

export function Footer() {
    return (
        <div className='bg-dark py-2'>
            <p className='text-center text-white'>All Rights Reserved &copy;{new Date().getFullYear()}</p>
        </div>
    )
}
