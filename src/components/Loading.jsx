import React, { useEffect } from 'react'

import '../assets/styles/Loading.css'

export default function Loading() {

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='loader__container'>
            <div className='loader'></div>
        </div>
    )
}