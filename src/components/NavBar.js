import React from 'react'

import { Link } from 'react-router-dom'

const NavBar = ({logout, activeTimer}) => {
    return (
        <nav className="nav-bar invert">
            <h2>Task Tracker</h2>
            <Link to="/">Home</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/projects">Projects</Link>
            {activeTimer ? <Link to="/timer">Current Timer</Link> : null}
            <button className="button" onClick={logout}>Logout</button>
        </nav>
    )
}

export default NavBar
