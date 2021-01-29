import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import TaskForm from './TaskForm'

const TaskDisplay = ({id, projectId, description, deleteTask, updateTask, server, setActiveTimer}) => {

    const history = useHistory()

    const [updating, setUpdating] = useState(false)
    const [minutes, setMinutes] = useState(15)
    // const [yourMinutes, setYourMinutes] = useState(initialMinutes)

    // const handleSubmit = e => {
    //     e.preventDefault()
    //     logMinutes(id, minutes)
    //     setMinutes(15)
    // }

    // const logMinutes = (taskId, minutes) => {
    //     server.post('/task_logs', {task_log: {task_id: taskId, duration_minutes: minutes, user_id: server.user.id}}, ({data}) => {
    //         setYourMinutes(minutes => minutes + data.duration_minutes)
    //     })
    // }

    const startTimer = () => {
        server.post("/task_logs/start", { task_log: {user_id: server.user.id, task_id: id}}, ({data}) => {
            setActiveTimer(data)
            history.push("/timer")
        })
    }

    return (
        <div className="box invert column-centered">
            <h4 className="light">{description}</h4>

            {/* <p>You've spent {yourMinutes} total minutes on this task.</p> */}

            {/* <form onSubmit={handleSubmit}>
                <label htmlFor="minutes">Log work time (minutes):</label>
                <input name="minutes" type="number" value={minutes} onChange={e => setMinutes(e.target.value)}/>
                <input type="submit" className="button" />
            </form> */}
            <button className="button" onClick={startTimer}>Start Timer</button>

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
