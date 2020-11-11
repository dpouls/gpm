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
    //need input handler for all this
    return (
        <div>
            <form >
                <label htmlFor='streetAddress'>
                    <input name='streetAddress' type="text"/>
                </label>
                <label htmlFor='city'>
                    <input name='city' type="text"/>
                </label>
                <label htmlFor='state'>
                    <input name='state' type="text"/>
                </label>
                <label htmlFor='rentalPrice'>$
                    <input name='rentalPrice' type="number"/>
                </label>
                <label htmlFor='bedrooms'>
                    <input name='bedrooms' type="number"/>
                </label>
                <label htmlFor='bathrooms'>
                    <input name='bathrooms' type="number"/>
                </label>
                <label htmlFor='occupied'>
                    <input name='occupied' type="text"/>
                </label>
                <label htmlFor='available'>
                    <input name='available' type="text"/>
                </label>
            </form>
        </div>
    )
}

export default withRouter(NewProperty)
