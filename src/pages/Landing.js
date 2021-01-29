import React from 'react'

import { Switch, Redirect, Route } from 'react-router-dom'

import CredentialForm from '../components/CredentialForm'

const Landing = ({ login, signup }) => {


    return (
        <Switch>
            <Route exact path="/">
                <h1>Task Tracker</h1>
                <CredentialForm type={"Signup"} submitData={signup}/>
                <CredentialForm type={"Login"} submitData={login}/>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default Landing
