import React, { useState, useEffect } from 'react'

import { useParams, useHistory } from 'react-router-dom'

import CustomerForm from '../components/CustomerForm'

const CustomerShow = ({server}) => {

    const { id } = useParams();

    const [customer, setCustomer] = useState(null)

    const history = useHistory()

    useEffect(() => {
        server.get(`/customers/${id}`, ({data}) => setCustomer(data))
    }, [id, server, setCustomer])

    const updateCustomer = (update) => {
        server.patch(`/customers/${id}`, update, ({data}) => setCustomer(data) )
    }

    const deleteCustomer = () => {
        server.delete(`/customers/${id}`, () => history.push("/customers"))
    }

    if (!customer) return null

    return (
        <div className="column-centered">
            <h2>{customer.name}</h2>
            <CustomerForm currentCustomer={customer} submitData={updateCustomer}/>
            <button className="button invert" onClick={deleteCustomer}>Delete</button>
        </div>
    )
}

export default CustomerShow
