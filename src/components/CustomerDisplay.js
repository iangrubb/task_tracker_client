import React from 'react'

import { Link } from 'react-router-dom'

const CustomerDisplay = ({ id, name }) => {
    return (
        <div className="column-centered box invert">
            <h3 className="light">{name}</h3>
            <Link className="light" to={`/customers/${id}`}>Details</Link>
        </div>
    )
}

export default CustomerDisplay
