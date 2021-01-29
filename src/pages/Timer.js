import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

const Timer = ({activeTimer, setActiveTimer, server}) => {

    const history = useHistory()

    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(() => new Date())
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [setCurrentTime])

    if (!activeTimer) return <h2>No current timer</h2>
    
    const stopTimer = () => {
        server.patch(`/task_logs/${activeTimer.id}/finish`, null, ({data}) => {
            history.push("/")
            setActiveTimer(null)
        })
    }



    const dateStarted = new Date(activeTimer.start_time)


    return (
        <div className="column-centered">
            <h2>{activeTimer.task.data.description}</h2>
            <p>Started {dateStarted.getTime()}</p>
            <p>Its now {currentTime.getTime()}</p>
            <button className="button invert" onClick={stopTimer}>Stop</button>
        </div>
    )
}

export default Timer
