import React from 'react'

import { Link } from 'react-router-dom'

const ProjectDisplay = ({ id, name, customer }) => {
    return (
        <div className="column-centered box invert">
            <h3 className="light">{name}</h3>
            <Link className="light" to={`/customers/${customer.data.id}`}>{customer.data.name}</Link>
            <Link className="light" to={`/projects/${id}`}>Details</Link>
        </div>
    )
}

export default ProjectDisplay
