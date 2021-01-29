import React, { useState } from 'react'

const TaskForm = ({ projectId, submitData, currentTask }) => {

    const type = currentTask ? "Update" : "Create"

    const initialState = {description: ""}

    const [formFields, setFormFields] = useState(currentTask ? {...currentTask} : initialState)

    const updateForm = e => setFormFields(current => ({...current, [e.target.name]: e.target.value}))

    const handleSubmit = e => {
        e.preventDefault()
        
        submitData({task: {...formFields, project_id: projectId}})

        if (!currentTask) {
            setFormFields(initialState)
        }
    }

    return (
        <form className="box invert column-centered" onSubmit={handleSubmit}>
            <h3 className="light">{`${type} Task`}</h3>
            <label htmlFor="name">Description</label>
            <input name="description" type="textarea" value={formFields.description} onChange={updateForm} />
            <input className="button" type="submit" value={type} />
        </form>
    )
}

export default TaskForm
