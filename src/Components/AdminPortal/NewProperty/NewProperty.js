import Axios from "axios";
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { withRouter } from "react-router-dom";
import './NewProperty.scss'
// still needs input error proofing 


const NewProperty = () => {
    const [formData, setFormData] = useState({
        streetAddress: '',
        city: '',
        state: '',
        occupied: false,
        rentalPrice: 0,
        available: false,
        bedrooms: 0,
        bathrooms: 0
    })
    const inputHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        console.log('fd', formData)
    }
    return (
        // <div>
            <form className='new-property-form'>
                <label htmlFor='streetAddress'>Street Address
                    <input name='streetAddress' onChange={inputHandler} type="text"/>
                </label>
                <label htmlFor='city'>City
                    <input name='city'onChange={inputHandler} type="text"/>
                </label>
                <label htmlFor='state'>State
                    <input name='state' onChange={inputHandler} type="text"/>
                </label>
                <label htmlFor='rentalPrice'>Price $
                    <input name='rentalPrice' onChange={inputHandler} type="number"/>
                </label>
                <label htmlFor='bedrooms'>Bedrooms
                    <input name='bedrooms' onChange={inputHandler} type="number"/>
                </label>
                <label htmlFor='bathrooms'>Bathrooms
                    <input name='bathrooms' onChange={inputHandler} type="number"/>
                </label>
                <label htmlFor='occupied'>Occupied
                    <input name='occupied' onChange={inputHandler} type="text"/>
                </label>
                <label htmlFor='available'>Available
                    <input name='available' onChange={inputHandler} type="text"/>
                </label>
            </form>
        // </div>
    )
}

export default withRouter(NewProperty)
