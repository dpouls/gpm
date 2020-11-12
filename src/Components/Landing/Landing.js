import React from 'react'
// import Header from '../Header/Header'
import {withRouter} from 'react-router-dom'
import './Landing.scss'

const Landing = (props) => {
    return (
        <div className='landing-page-container'>
            <img id='landing-image' src="https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1143&q=80" alt=""/>
            <span id='welcome-msg'>Welcome to Golden Property Management</span>
            <section id='info-box'>
                {/* <span>Returning renter or landlord? <button id='login-button'>Log in</button></span> */}
                <div className='perk-info'>
                <img src="https://www.rentecdirect.com/assets/images/icons/tenant-online-payments.png" alt=""/>
                <span>Easy, fast, and secure payments.</span>
                </div>
                <div className='perk-info'>
                <img src="https://www.rentecdirect.com/assets/images/icons/online-file-management.png" alt=""/>
                <span>Maintenance requests for tenants and landlords.</span>
                </div>
                <div className='perk-info'>
                <img src="https://www.rentecdirect.com/assets/images/icons/publish-vacancies-online.png" alt=""/>
                <span>Organize your properties.</span>
                </div>
                <div className='perk-info'>
                <img src="https://www.rentecdirect.com/assets/images/icons/general-ledger-accounting2.png" alt=""/>
                <span>Keep track of payments and fees.</span>
                </div>
            </section>
        </div>
    )
}

export default withRouter(Landing)
