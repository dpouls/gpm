import React, { useState } from "react";
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
  const [emergency, toggleEmergency] = useState(false);
  const optionToggler = (option) => {
    switch (option) {
      case "emergency":
        toggleEmergency(!emergency)
        console.log(emergency);
        break;
        default:
            console.log('default')
    }
  };
  return (
    <div>
      <Form>
        {options.map((option) => {
          let capitalized = option.charAt(0).toUpperCase() + option.slice(1);
          return <button onClick={() => optionToggler(option)}>{capitalized}</button>;
        })}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Please explain your request in detail:</Form.Label>
          <Form.Control type="email" placeholder="Explain here" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.File />
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="Light" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default MaintenanceRequest;
