import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'
import './Login.scss'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // useEffect(() => {
    //     console.log(password)
    // },[password])
    const login = (e) => {
        console.log('hit')
        Axios.post('/auth/login',{username, password}).then(
            res => console.log(res.data)
        )
        setUsername('')
        setPassword('')
        e.preventDefault()
        props.history.push('/portal')
    }

    return (
        <div className="login-page">
            <div>top of login modal</div>\
            <form onSubmit={login}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                <button type='submit' >LOGIN</button>
            </form>
        </div>
    )
}

export default withRouter(Login)
