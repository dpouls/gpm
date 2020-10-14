import React, { useState, useEffect } from "react";
import swal from "sweetalert";

import "./NewRenter.scss";
const NewRenter = () => {
  //Declare state variables
  const [adminChecked, toggleAdminChecked] = useState(false);
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [newRenterForm, setNewRenterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    occupants: "",
    isadmin: false,
  });
  //watches for last digit of phone number to generate a username
  useEffect(() => {
    generateUsername();
  }, [newRenterForm.phoneNumber]);

  //generates a username off of the firstName lastName and last four digits of the phone number. Can be changed if desired.
  const generateUsername = async () => {
    if (newRenterForm.phoneNumber.length > 9) {
      let lastFour = /[0-9]{4}$/;
      let lastFourPhone = lastFour.exec(newRenterForm.phoneNumber);
      await setGeneratedUsername(
        newRenterForm.firstName + newRenterForm.lastName + lastFourPhone
      );
      await setNewRenterForm({ ...newRenterForm, username: generatedUsername });
    }
  };
  //handles all input fields and setting their values to state.
  const inputHandler = (e) => {
    setNewRenterForm({ ...newRenterForm, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form className="new-renter-form">
        <section>
          <label htmlFor="firstName">
            First Name
            <input name="firstName" type="text" onChange={inputHandler} />
          </label>

          <label htmlFor="lastName">
            Last Name
            <input name="lastName" type="text" onChange={inputHandler} />
          </label>

          <label htmlFor="email">
            Email
            <input name="email" type="email" onChange={inputHandler} />
          </label>

          <label htmlFor="phoneNumber">
            Phone Number
            <input
              name="phoneNumber"
              type="tel"
              maxLength="10"
              onChange={inputHandler}
            />
          </label>

          <label htmlFor="username">
            Username
            <input
              value={newRenterForm.username}
              name="username"
              type="text"
              onFocus={generateUsername}
              onChange={(e) => {
                setGeneratedUsername(e.target.value);
                inputHandler(e);
              }}
            />
          </label>
          <label htmlFor="password">
            Password
            <input name="password" type="password" onChange={inputHandler} />
          </label>
          <label htmlFor="occupants">
            Occupants
            <input name="occupants" type="number" onChange={inputHandler} />
          </label>
          <label className="admin-checkbox-container" htmlFor="adminCheckbox">
            Admin:{" "}
            {adminChecked ? (
              <div>
                <button
                  type="button"
                  name="adminCheckbox"
                  id="admin-button-checked"
                  onClick={() => toggleAdminChecked(!adminChecked)}
                >
                  Yes
                </button>
                <span>
                  Click if you wish to remove admin controls from this user.
                </span>
              </div>
            ) : (
              <div>
                <button
                  name="adminCheckbox"
                  id="admin-button-not-checked"
                  type="button"
                  onClick={() => {
                    swal({
                      title: "Warning!",
                      text:
                        "Checking this box will alow this user admin access!",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then((okay) => {
                      if (okay) {
                        toggleAdminChecked(!adminChecked);
                      } else {
                        swal("This user was not marked as an admin.");
                      }
                    });
                  }}
                >
                  No
                </button>
                <div>Click if you wish to give this user admin controls.</div>
              </div>
            )}
          </label>
          <button id="submit-new-renter-btn">Submit New Renter Form</button>
        </section>
      </form>
    </div>
  );
};

export default NewRenter;
