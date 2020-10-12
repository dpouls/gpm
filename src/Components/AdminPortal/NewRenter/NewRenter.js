import React from 'react'
import './NewRenter.scss'
function NewRenter() {
    return (
        <div>
            <form className="new-renter-form">
              <label for="firstName">First Name</label>
              <input name="firstName" type="text" />
              <label for="lastName">Last Name</label>
              <input name="firstName" type="text" />
              <label for="email">Email</label>
              <input name="email" type="email" />
              <label for="phoneNumber">Phone Number</label>
              <input name="phoneNumber" type="text" />
              <label for="username">Username</label>
              <input name="username" type="text" />
              <label for="password">Password</label>
              <input name="password" type="password" />
              <label for="occupants">Occupants</label>
              <input name="occupants" type="number" />
              <label for='adminCheckbox'>Admin:</label>
              <input name='adminCheckbox' type="checkbox" />
            </form>
        </div>
    )
}

export default NewRenter
