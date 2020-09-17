import React, { useState } from "react";
import './MaintenanceRequest.scss'
import {
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Row,
  Col,
} from "react-bootstrap";

const MaintenanceRequest = () => {
  const options = [
    "emergency",
    "bathroom",
    "bedroom",
    "yard",
    "kitchen",
    "living_room",
    "exterior",
    "appliance",
    "plumbing",
    "electrical",
    "other",
  ];
  /// WORKING ON MAKING SELECTED BUTTONS TURN ANOTHER COLOR>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [emergency, toggleEmergency] = useState(false);
  const [requestType, setRequestType] = useState([])
  const [selectedButton, setSelectedButton] = useState('selected-button')
  const [unselectedButton, setUnselectedButton] = useState('')
  const optionToggler = (option) => {
    switch (option) {
      case "emergency":
        toggleEmergency(!emergency)
        console.log(emergency);
        break;
        default:
            requestType.push(option)
            console.log( requestType)
    }
  };
  return (
    <div>
      <Form id='request-form'>
        <section id='option-list'>
        {options.map((option) => {
          let capitalized = option.charAt(0).toUpperCase() + option.slice(1);
          return <Button id={{unselectedButton}} variant='light' onClick={() => optionToggler(option)}>{capitalized}</Button>;
        })}

        </section>
        <Form.Group >
          <Form.Label>Please explain your request in detail:</Form.Label>
          <Form.Control as='textarea' rows='3' placeholder="Explain here" />
        </Form.Group>
        <Form.Group >
          <Form.Text>
            Please upload a picture of the problem if necessary.
          </Form.Text>
          <Form.File />
          <Form.Control placeholder="Phone Number" />
          <Form.Control placeholder="Email" />
        </Form.Group>
        <Button variant="light" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default MaintenanceRequest;
