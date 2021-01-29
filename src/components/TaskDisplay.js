import React, { useState } from 'react'

import TaskForm from './TaskForm'

const TaskDisplay = ({id, projectId, description, deleteTask, updateTask, task_logs, server}) => {

    const initialMinutes = task_logs.data.filter(l => l.user_id === server.user.id).reduce((sum, log) => log.duration_minutes + sum , 0)

    const [updating, setUpdating] = useState(false)
    const [minutes, setMinutes] = useState(15)
    const [yourMinutes, setYourMinutes] = useState(initialMinutes)

    const handleSubmit = e => {
        e.preventDefault()
        logMinutes(id, minutes)
        setMinutes(15)
    }

    const logMinutes = (taskId, minutes) => {
        server.post('/task_logs', {task_log: {task_id: taskId, duration_minutes: minutes, user_id: server.user.id}}, ({data}) => {
            setYourMinutes(minutes => minutes + data.duration_minutes)
        })
    }

    return (
        <div className="box invert column-centered">
            <h4 className="light">{description}</h4>

            <p>You've spent {yourMinutes} total minutes on this task.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="minutes">Log work time (minutes):</label>
                <input name="minutes" type="number" value={minutes} onChange={e => setMinutes(e.target.value)}/>
                <input type="submit" className="button" />
            </form>

            {updating 
            ? 
            <>
            <TaskForm projectId={projectId} submitData={updateTask} currentTask={{id, description}} />
            <button className="button" onClick={() => setUpdating(false)}>Cancel</button>
            </>
            : <button className="button" onClick={() => setUpdating(true)}>Update</button>}

            <button className="button" onClick={() => deleteTask(id)}>Delete</button>
        </div>
    )
}

export default TaskDisplay
