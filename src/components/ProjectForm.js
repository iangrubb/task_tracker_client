import React, { useState } from 'react'

const ProjectForm = ({ customers, submitData, currentProject }) => {

    const type = currentProject ? "Update" : "Create"

    const initialState = {name: "", customer_id: customers[0].id}

    const [formFields, setFormFields] = useState(currentProject ? {...currentProject} : initialState)

    const updateForm = e => setFormFields(current => ({...current, [e.target.name]: e.target.value}))

    const handleSubmit = e => {
        e.preventDefault()
        submitData({ project: formFields })
        if (!currentProject) {
            setFormFields(initialState)
        }
    }
    
    return (
        <form className="box invert column-centered" onSubmit={handleSubmit}>
            <h3 className="light">{`${type} Project`}</h3>
            <label htmlFor="customer_id">Customer</label>
            <select name="customer_id" onChange={updateForm} value={formFields.customer_id ? formFields.customer_id : "None"}>
                {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
            </select>
            <label htmlFor="name">Name</label>
            <input name="name" value={formFields.name} onChange={updateForm} />
            <input className="button" type="submit" value={type} />
        </form>
    )
}

export default ProjectForm
