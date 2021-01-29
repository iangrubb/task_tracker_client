import React, { useState, useEffect } from 'react'

import ProjectDisplay from '../components/ProjectDisplay'

const ProjectIndex = ({server}) => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        server.get("/projects", ({data}) => setProjects(data))
    }, [server, setProjects])
    
    return (
        <div className="column-centered">
            <h2>Projects</h2>
            {projects.map(project => <ProjectDisplay key={project.id} {...project} />)}
        </div>
    )
}

export default ProjectIndex
