import React from 'react'
// import Header from '../Header/Header'
import {withRouter} from 'react-router-dom'

const Landing = (props) => {
    return (
        <div>
            <button style={{'margin': '50px'}} onClick={() => props.history.push('/login')}>Login</button>
        </div>
    )
}

export default withRouter(Landing)
