import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import CustomerForm from '../components/CustomerForm'
import ProjectForm from '../components/ProjectForm'

const Dashboard = ({server}) => {

    const [customers, setCustomers] = useState(null)

    const history = useHistory()

    const postCustomer = params => {
        server.post("/customers", params, ({data}) => {
            history.push(`/customers/${data.id}`)
        })
    }

    const postProject = params => {
        server.post("/projects", params, ({data}) => {
            history.push(`/projects/${data.id}`)
        })
    }

    useEffect(() => {
        server.get("/customers", ({data}) => setCustomers(data))
    }, [server, setCustomers])

    if (!customers) return null

    return (
        <div className="column-centered">
            <h2>Customers</h2>
            <Link to="/customers">View All</Link>
            <CustomerForm currentCustomer={null} submitData={postCustomer} />

            <h2>Projects</h2>
            <Link to="/projects">View All</Link>
            <ProjectForm currentProject={null} submitData={postProject} customers={customers} /> 
        </div>
    )
}

export default Dashboard
