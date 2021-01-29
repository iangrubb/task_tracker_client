import React, { useState, useEffect } from 'react'

import { useParams, useHistory } from 'react-router-dom'

import ProjectForm from '../components/ProjectForm'
import TaskDisplay from '../components/TaskDisplay'
import TaskForm from '../components/TaskForm'

const ProjectShow = ({ server, setActiveTimer }) => {

    const { id } = useParams()

    const history = useHistory()

    const [project, setProject] = useState(null)
    const [tasks, setTasks] = useState(null)

    const [customers, setCustomers] = useState(null)

    useEffect(() => {
        server.get(`/projects/${id}`, ({data}) => {
            setProject({id: data.id, name: data.name, customer: data.customer})
            setTasks(data.tasks.data)
        })
        server.get(`/customers`, ({data}) => setCustomers(data))
    }, [id, server, setProject, setCustomers, setTasks])

    const updateProject = params => {
        server.patch(`/projects/${id}`, params, ({data}) => {
            setProject({id: data.id, name: data.name, customer: data.customer})
        })
    }

    const deleteProject = () => {
        server.delete(`/projects/${id}`, () => history.push("/projects"))
    }

    const createTask = params => {
        server.post(`/tasks`, params, ({data}) => {
            if (data) {
                setTasks(tasks => [data, ...tasks])
            }
        })
    }

    const updateTask = params => {
        server.patch(`/tasks/${params.task.id}`, params, ({data}) => {
            setTasks(tasks => tasks.map(t => t.id === data.id ? {...t, ...data} : t))
        })
    }

    const deleteTask = task_id => {
        server.delete(`/tasks/${task_id}`, deleted_id => {
            setTasks(tasks => tasks.filter(t => t.id !== deleted_id))
        })
    }

    
    if (!project || !customers || !tasks) return null

    return (
        <div className="column-centered">
            <h2>{project.name}</h2>
            <p>for</p>
            <h3>{project.customer.data ? project.customer.data.name : "No One"}</h3>
            <ProjectForm customers={customers} currentProject={project} submitData={updateProject}/>
            <button className="button invert" onClick={deleteProject}>Delete</button>
            <TaskForm projectId={project.id} submitData={createTask}/>
            <h3>Tasks</h3>
            {tasks.map(task => <TaskDisplay key={task.id} {...task} projectId={project.id} deleteTask={deleteTask} updateTask={updateTask} setActiveTimer={setActiveTimer} server={server}/>)}
        </div>
    )
}

export default ProjectShow
