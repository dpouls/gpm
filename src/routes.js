import React from 'react'

import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Portal from './Components/Portal/Portal'
import Login from './Components/Login/Login'
import Pay from './Components/Pay/Pay'
import MaintenanceRequest from './Components/MaintenanceRequest/MaintenanceRequest'
import AdminPortal from './Components/AdminPortal/AdminPortal';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/portal' component={Portal} />
        <Route path='/login' component={Login} />
        <Route path='/pay' component={Pay} />
        <Route path='/request' component={MaintenanceRequest} />
        <Route path='/admin' component={AdminPortal}/>
    </Switch>
)