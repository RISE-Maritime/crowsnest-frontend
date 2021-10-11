import React from 'react'
import PropTypes from 'prop-types'

export default function Pointer({direction}) {

    return (
        <div>
            <h3>{direction}</h3>
            <div style={{
                transform: 'rotate('+direction+'deg)',
                height: '5rem',
                backgroundColor: '#000'
            }}></div>
        </div>
    )
}

Pointer.propTypes = {
    direction: PropTypes.float.isRequired
}
