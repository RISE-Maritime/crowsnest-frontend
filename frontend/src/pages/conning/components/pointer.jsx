import React from 'react'

export default function Pointer(props) {

    return (
        <div>
            <h3>{props.direction}</h3>
            <div style={{
                transform: 'rotate('+props.direction+'deg)',
                height: '5rem',
                backgroundColor: '#000'
            }}></div>
        </div>
    )
}
