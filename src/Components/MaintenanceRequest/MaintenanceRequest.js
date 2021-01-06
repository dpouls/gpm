import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./MaintenanceRequest.scss";
import swal from "sweetalert";

import { Form, Button } from "react-bootstrap";
import Axios from "axios";

const MaintenanceRequest = (props) => {
  const problemAreas = [
    "bathroom",
    "bedroom",
    "yard",
    "kitchen",
    "living room",
    "exterior",
    "appliance",
    "plumbing",
    "electrical",
    "other",
  ];
  const [emergency, toggleEmergency] = useState(false);
  const [problemAreaArray, setProblemAreaArray] = useState([]);
  const [selectedProblemArea, setSelectedProblemArea] = useState({});
  const [requestDetails, setRequestDetails] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    Axios.get("/api/user").then((res) => {
      setUserInfo(res.data);
    });
  };
  const problemAreaToggler = (problemArea) => {
    if (!problemAreaArray.includes(problemArea)) {
      problemAreaArray.push(problemArea);
    } else {
      let problemAreaIndex = problemAreaArray.findIndex(
        (element) => element === problemArea
      );
      problemAreaArray.splice(problemAreaIndex, 1);
    }
  };


  const submitRequest = (e) => {
    e.preventDefault();
    let property_id = userInfo.property_id;
    Axios.post("/api/request", {
      property_id,
      problemAreaArray,
      emergency,
      requestDetails,
      phoneNumber,
      email,
    }).then((res) => {
      swal("Success", "Your request was submitted!", "success");
      props.history.push("/portal");
    });
  };

  return (
    <div>
      <Form onSubmit={(e) => submitRequest(e)} id="request-form">
        <section>
          <Form.Text className="request-text-prompts">
            For:{" "}
            {userInfo.street_address
              ? `${userInfo.street_address}, ${userInfo.city}, ${userInfo.state}`
              : null}
          </Form.Text>
        </section>
        <section className="emergency-button">
          <Form.Text className="request-text-prompts">
            Select all that apply:
          </Form.Text>

          <Button
            variant="light"
            id={emergency ? "emergency-button" : "unselected-emergency-button"}
            onClick={() => toggleEmergency(!emergency)}
          >
            EMERGENCY
          </Button>
        </section>
        <section id="problem-areas-list">
          {problemAreas.map((problemArea,i) => {
            let capitalized =
              problemArea.charAt(0).toUpperCase() + problemArea.slice(1);
            return (
              <Button
                key={i}
                id={
                  problemAreaArray.includes(problemArea)
                    ? "selected-button"
                    : ""
                }
                variant="light"
                onClick={() => {
                  setSelectedProblemArea(problemArea);
                  problemAreaToggler(problemArea);
                }}
              >
                {capitalized}
              </Button>
            );
          })}
        </section>
        <Form.Group>
          <Form.Text className="request-text-prompts">
            Please explain your request in detail:
          </Form.Text>
          <Form.Control
            name="requestDetails"
            as="textarea"
            rows="3"
            placeholder="Explain here."
            onChange={(e) => setRequestDetails(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Text className="request-text-prompts">
            Please upload a picture of the problem if necessary.
          </Form.Text>
          <Form.File />
          <Form.Text className="request-text-prompts">
            Please leave the best contact information so we can get back to you
            regarding this request.
          </Form.Text>
          <Form.Control
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Group>
        <Button variant="light" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(MaintenanceRequest);
