import React, { useState, useEffect } from 'react'

import CustomerDisplay from '../components/CustomerDisplay'

const CustomerIndex = ({server}) => {

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        server.get("/customers", ({data}) => setCustomers(data))
    }, [server, setCustomers])

    return (
    
        <div className="column-centered">
            <h2>Customers</h2>
            {customers.map(customer => <CustomerDisplay key={customer.id} {...customer} />)}
        </div>
    )
}

export default CustomerIndex
