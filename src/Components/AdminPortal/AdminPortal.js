import Axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import './AdminPortal.scss'

const AdminPortal = (props) => {
    useEffect(() => {
    Axios.get('/api/user').then(res => {
        console.log('admin resdata')
        if(!res.data.isadmin){
            Axios.post('/auth/logout').then(props.history.push('/'))
            
        }
    })
    },[])
    const [rentersClicked,toggleRentersClicked] = useState(false);
    const [propertiesClicked,togglePropertiesClicked] = useState(false);
    const [paymentsClicked, togglePaymentsClicked] = useState(false);
    const [maintenanceRequestsClicked,toggleMaintenanceRequestsClicked] = useState(false)

    return (
        <div className='admin-portal'>
            <button onClick={() => toggleRentersClicked(!rentersClicked)}>
                Renters
            </button>
            {rentersClicked ? (
                <div className='sub-button-container'>

                <button id="sub-button">See Current Renters</button>
                <button id="sub-button">Add a New Renter</button>
                </div>
            ):
            (
                null
            )}
            <button onClick={() => togglePropertiesClicked(!propertiesClicked)}>
                Properties
            </button>
            {propertiesClicked ? (
                <div className='sub-button-container'>

                <button id="sub-button">See Current Properties</button>
                <button id="sub-button">Add a New Property</button>
                </div>
            ):
            (
                null
            )}
            <button onClick={() => togglePaymentsClicked(!paymentsClicked)}>
                Payments
            </button>
            {paymentsClicked ? (
                <div className='sub-button-container'>
                <button id="sub-button">See All Payments</button>
                </div>
            ):
            (
                null
            )}
            <button onClick={() => toggleMaintenanceRequestsClicked(!maintenanceRequestsClicked)}>
                Maintenance Requests
            </button>
            {maintenanceRequestsClicked ? (
                <div className='sub-button-container'>

                <button id="sub-button">See Current Maintenance Requests</button>
                </div>
            ):
            (
                null
            )}
        </div>
    )
}

export default withRouter(AdminPortal)

