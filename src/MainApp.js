import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import CustomerIndex from './pages/CustomerIndex'
import CustomerShow from './pages/CustomerShow'
import ProjectIndex from './pages/ProjectIndex'
import ProjectShow from './pages/ProjectShow'

const MainApp = ({ server }) => {

    const logout = () => {
        server.delete("/session", () => server.disconnect())
    }

    return (
        <>
            <NavBar logout={logout} />
            <Switch>
                <Route exact path="/">
                    <Dashboard server={server} />
                </Route>
                <Route path="/customers/:id">
                    <CustomerShow server={server}/>
                </Route>
                <Route path="/customers">
                    <CustomerIndex server={server} />
                </Route>
                <Route path="/projects/:id">
                    <ProjectShow server={server} />
                </Route>
                <Route path="/projects">
                    <ProjectIndex server={server} />
                </Route>
            </Switch>
        </>
    )
}

export default MainApp
