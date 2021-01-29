
const apiUrl = "http://localhost:4000/api"

class ServerAdapter {

    constructor(user, authToken, disconnect) {
        this.user = user
        this.authToken = authToken
        this.disconnect = disconnect
    }

    handleCallback(resp, cb) {
        if (resp.status === 401) {
            this.disconnect()
        } else {
            resp.json()
            .then(cb)
        }
    }

    get(path, cb) {
        return fetch(`${apiUrl}${path}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authToken}`
            }
        })
        .then(resp => this.handleCallback(resp, cb))
    }

    post(path, data, cb) {
        return fetch(`${apiUrl}${path}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authToken}`
            },
            body: JSON.stringify(data)
            })
            .then(resp => this.handleCallback(resp, cb))
    }

    patch(path, data, cb) {
        return fetch(`${apiUrl}${path}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authToken}`
            },
            body: JSON.stringify(data)
            })
            .then(resp => this.handleCallback(resp, cb))
    }

    delete(path, cb) {
        return fetch(`${apiUrl}${path}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authToken}`
            }
            })
            .then(resp => this.handleCallback(resp, cb))
    }

    static autoLogin() {
        return fetch(`${apiUrl}/session`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(r => r.json())
    }

    static login(credentials) {
        return fetch(`${apiUrl}/session`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({credentials})
        })
        .then(resp => resp.json())
    }

    static signup(credentials) {
        return fetch(`${apiUrl}/users`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: credentials})
        })
        .then(resp => resp.json())
    }
    
}

export default ServerAdapter