import React from 'react'

import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Portal from './Components/Portal/Portal'
import Login from './Components/Login/Login'
import Pay from './Components/Pay/Pay'
import MaintenanceRequest from './Components/MaintenanceRequest/MaintenanceRequest'
import LandlordPortal from './Components/LandlordPortal/LandlordPortal';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/portal' component={Portal} />
        <Route path='/login' component={Login} />
        <Route path='/pay' component={Pay} />
        <Route path='/request' component={MaintenanceRequest} />
        <Route path='/landlord' component={LandlordPortal}/>
    </Switch>
)