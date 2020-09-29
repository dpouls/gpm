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
    return (
        <div>
            <section>
                Renters
            </section>
            <section>
                Properties
            </section>
            <section>
                Payments
            </section>
            <section>
                Maintenance Requests
            </section>
        </div>
    )
}

export default withRouter(AdminPortal)

