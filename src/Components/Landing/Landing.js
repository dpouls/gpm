import React from 'react'
// import Header from '../Header/Header'
import {withRouter} from 'react-router-dom'

const Landing = (props) => {
    return (
        <div>
            <button  onClick={() => props.history.push('/login')}>Login</button>
        </div>
    )
}

export default withRouter(Landing)
