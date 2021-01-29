import { useEffect, useState } from 'react'

import ServerAdapter from '../data/ServerAdapter'

const useServerAdapter = () => {

    const [autoLogging, setAutoLogging] = useState(true)

    const [server, setServer] = useState(null)

    useEffect(() => {
        ServerAdapter.autoLogin()
        .then(data => {
            if (data.data?.login_successful) {
                setServer(new ServerAdapter(data.data.user, data.data.auth_token, () => setServer(null)))
            }
            setAutoLogging(false)
        })
    }, [setServer, setAutoLogging])

    const login = (credentials) => {
        ServerAdapter.login(credentials)
        .then(data => {
            if (data.data?.login_successful) {
                setServer(new ServerAdapter(data.data.user, data.data.auth_token, () => setServer(null)))
            }
        })
    }

    const signup = (credentials) => {
        ServerAdapter.signup(credentials)
        .then(data => {
            if (data.data?.login_successful) {
                setServer(new ServerAdapter(data.data.user, data.data.auth_token, () => setServer(null)))
            }
        })
    }

    return [autoLogging, server, login, signup]
}

export default useServerAdapter