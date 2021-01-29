import React, { useState } from 'react'

const CustomerForm = ({submitData, currentCustomer}) => {

    const type = currentCustomer ? "Update" : "Create"

    const initialState = {name: ""}

    const [formFields, setFormFields] = useState(currentCustomer ? {...currentCustomer} : initialState)

    const updateForm = e => setFormFields(current => ({...current, [e.target.name]: e.target.value}))

    const handleSubmit = e => {
        e.preventDefault()
        submitData({ customer: formFields })
        if (!currentCustomer) {
            setFormFields(initialState)
        }
    }

    return (
        <form className="box invert column-centered" onSubmit={handleSubmit}>
            <h3 className="light">{`${type} Customer`}</h3>
            <label htmlFor="name">Name</label>
            <input name="name" value={formFields.name} onChange={updateForm} />
            <input className="button" type="submit" value={type} />
        </form>
    )
}

export default CustomerForm
