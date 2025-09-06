import React from 'react'

import '../assets/styles/Chip.css'

export default function Chip({ name }) {
    return (
        <div className='chip'>
            <span>{name}</span>
        </div>
    )
}
