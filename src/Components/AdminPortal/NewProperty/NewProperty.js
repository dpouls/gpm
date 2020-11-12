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
        rentalPrice: 0,
        bedrooms: 0,
        bathrooms: 0,
        occupied: false,
        available: false
    })
    const inputHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        console.log('fd', formData)
    }
    const submitForm = (e) => {
        console.log('hit')
        e.preventDefault();
        Axios.post('/api/property',formData)
        .then(res => console.log(res.data))
    }
    return (
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
                <label htmlFor='occupied'>Occupied?
                    {formData.occupied ? (<button id='yes-button' type='button' onClick={() => setFormData({...formData, occupied: false})}>Yes</button>) : (<button id='no-button' type='button' onClick={() => setFormData({...formData, occupied: true})}>No</button>)}
                    
                </label>
                <label htmlFor='available'>Available?
                {formData.available ? (<button id='yes-button' type='button' onClick={() => setFormData({...formData, available: false})}>Yes</button>) : (<button id='no-button' type='button' onClick={() => setFormData({...formData, available: true})}>No</button>)}
                </label>
                <button id='submit-new-property' onClick={submitForm} type='button'>Submit</button>
            </form>
    )
}

export default withRouter(NewProperty)
