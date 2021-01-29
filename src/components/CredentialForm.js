import React, { useState } from 'react'

const CredentialForm = ({ type, submitData }) => {

    const initialState = {name: "", password: ""}

    const [formFields, setFormFields] = useState(initialState)

    const updateForm = e => setFormFields(current => ({...current, [e.target.name]: e.target.value}))

    const handleSubmit = e => {
        e.preventDefault()
        submitData(formFields)
        setFormFields(initialState)
    }

    return (
        <form className="column-centered box invert" onSubmit={handleSubmit}>
            <h2 className="invert">{type}</h2>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={formFields.name} onChange={updateForm}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={formFields.password} onChange={updateForm}/>
            <input className="button" type="submit"/>
        </form>
    )
}

export default CredentialForm
