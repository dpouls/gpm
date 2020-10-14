import Axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./AdminPortal.scss";
import NewRenter from "./NewRenter/NewRenter";
import swal from "sweetalert";

const AdminPortal = (props) => {
  //Makes sure the user has admin authorization on mounting
  useEffect(() => {
    Axios.get("/api/user").then((res) => {
      console.log("admin resdata");
      if (!res.data.isadmin) {
        Axios.post("/auth/logout").then(props.history.push("/"));
      }
    });
  }, []);
  //declare state variables
  const [rentersClicked, toggleRentersClicked] = useState(true);
  const [newRenterClicked, toggleNRClicked] = useState(true);
  const [adminChecked, toggleAdminChecked] = useState(false);
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
  useEffect(() => {
    generateUsername();
    console.log(generatedUsername);
    console.log(newRenterForm);
  }, [newRenterForm.phoneNumber]);

  const [propertiesClicked, togglePropertiesClicked] = useState(false);
  const [paymentsClicked, togglePaymentsClicked] = useState(false);
  const [mRClicked, toggleMRClicked] = useState(false);
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [usernameWasGenerated, toggleUsernameGenerated] = useState(false)

  //generates a username off of the firstName lastName and last four digits of the phone number. Can be changed if desired.
  const generateUsername = async () => {
    // if(!usernameWasGenerated){
      if (newRenterForm.phoneNumber.length > 9) {
      let lastFour = /[0-9]{4}$/;
      let lastFourPhone = lastFour.exec(newRenterForm.phoneNumber);
      await setGeneratedUsername(
        newRenterForm.firstName + newRenterForm.lastName + lastFourPhone
      );
      await setNewRenterForm({ ...newRenterForm, username: generatedUsername });
      toggleUsernameGenerated(true);

    // }
    }
    
    console.log("generate username didnt fire yet");
  };
  //handles all input fields and setting their values to state.
  const inputHandler = (e) => {
    setNewRenterForm({ ...newRenterForm, [e.target.name]: e.target.value });
  };
  console.log("lets see username:", newRenterForm.username);
  return (
    <div className="admin-portal">
      <button onClick={() => toggleRentersClicked(!rentersClicked)}>
        Renters
      </button>
      {rentersClicked ? (
        <div>
          <div className="sub-button-container">
            <button id="sub-button">See Current Renters</button>
            <button
              id="sub-button"
              onClick={() => toggleNRClicked(!newRenterClicked)}
            >
              Add a New Renter
            </button>
          </div>
          {newRenterClicked ? (
            //seperate component but i wanna make sure i update it correctly
            // <NewRenter setNewRenterFormFn={setNewRenterForm}/>
            <form className="new-renter-form">
              <label for="firstName">First Name</label>
              <input name="firstName" type="text" onChange={inputHandler} />
              <label for="lastName">Last Name</label>
              <input name="lastName" type="text" onChange={inputHandler} />
              <label for="email">Email</label>
              <input name="email" type="email" onChange={inputHandler} />
              <label for="phoneNumber">Phone Number</label>
              <input
                name="phoneNumber"
                type="text"
                maxLength="10"
                onChange={inputHandler}
              />
              <label for="username">Username</label>
              <input
                value={newRenterForm.username}
                name="username"
                type="text"
                onFocus={generateUsername}
                onChange={(e) => {
                  toggleUsernameGenerated(false)
                  setGeneratedUsername(e.target.value);
                  inputHandler(e);
                }}
              />
              <label for="password">Password</label>
              <input name="password" type="password" onChange={inputHandler} />
              <label for="occupants">Occupants</label>
              <input name="occupants" type="number" onChange={inputHandler} />

              <label className="admin-checkbox-container" for="adminCheckbox">
                Admin:{" "}
                {adminChecked ? (
                  <>
                    <button
                      name="adminCheckbox"
                      id="admin-button-checked"
                      onClick={() => toggleAdminChecked(!adminChecked)}
                    >
                      Yes
                    </button>
                    <span>
                      Click if you wish to remove admin controls from this user.
                    </span>
                  </>
                ) : (
                  <>
                    <button
                      name="adminCheckbox"
                      id="admin-button-not-checked"
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
                    <span>
                      Click if you wish to give this user admin controls.
                    </span>
                  </>
                )}
              </label>
            </form>
          ) : null}
        </div>
      ) : null}
      <button onClick={() => togglePropertiesClicked(!propertiesClicked)}>
        Properties
      </button>
      {propertiesClicked ? (
        <div className="sub-button-container">
          <button id="sub-button">See Current Properties</button>
          <button id="sub-button">Add a New Property</button>
        </div>
      ) : null}
      <button onClick={() => togglePaymentsClicked(!paymentsClicked)}>
        Payments
      </button>
      {paymentsClicked ? (
        <div className="sub-button-container">
          <button id="sub-button">See All Payments</button>
        </div>
      ) : null}
      <button onClick={() => toggleMRClicked(!mRClicked)}>
        Maintenance Requests
      </button>
      {mRClicked ? (
        <div className="sub-button-container">
          <button id="sub-button">See Current Maintenance Requests</button>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(AdminPortal);
