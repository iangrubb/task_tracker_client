import React, {useState, useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import CustomerIndex from './pages/CustomerIndex'
import CustomerShow from './pages/CustomerShow'
import ProjectIndex from './pages/ProjectIndex'
import ProjectShow from './pages/ProjectShow'
import Timer from './pages/Timer'

const MainApp = ({ server }) => {

    const logout = () => {
        server.delete("/session", () => server.disconnect())
    }

    const [activeTimer, setActiveTimer] = useState(null)

    useEffect(() => {
        server.get("/task_logs/active_task", ({data}) => {
            if (data) {
                setActiveTimer(data)
            }
        })
    }, [])

    return (
        <>
            <NavBar logout={logout} activeTimer={activeTimer} />
            <Switch>
                <Route exact path="/">
                    <Dashboard server={server} />
                </Route>
                <Route exact path="/timer">
                    <Timer activeTimer={activeTimer} setActiveTimer={setActiveTimer} server={server}/>
                </Route>
                <Route path="/customers/:id">
                    <CustomerShow server={server}/>
                </Route>
                <Route path="/customers">
                    <CustomerIndex server={server} />
                </Route>
                <Route path="/projects/:id">
                    <ProjectShow server={server} setActiveTimer={setActiveTimer}/>
                </Route>
                <Route path="/projects">
                    <ProjectIndex server={server} />
                </Route>
            </Switch>
        </>
    )
}

export default MainApp
