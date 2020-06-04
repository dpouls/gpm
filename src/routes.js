import React from 'react'

import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Portal from './Components/Portal/Portal'
import Login from './Components/Login/Login'


export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/portal' component={Portal} />
        <Route path='/login' component={Login} />
    </Switch>
)