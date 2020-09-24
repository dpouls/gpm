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
import Axios from "axios";

const MaintenanceRequest = () => {
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
  const [problemAreaArray, setproblemAreaArray] = useState([]);
  const [selectedproblemArea, setSelectedproblemArea] = useState({})
  const [requestDetails, setRequestDetails] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')

  
  const problemAreaToggler = (problemArea) => {
            if(!problemAreaArray.includes(problemArea)){
              problemAreaArray.push(problemArea)
            } else {
              let problemAreaIndex = problemAreaArray.findIndex((element) => element === problemArea)
              problemAreaArray.splice(problemAreaIndex,1)
            }
            console.log( problemAreaArray)
    
  };

  console.log('rD',requestDetails)
  console.log('pN',phoneNumber)
  console.log('email',email)
  const submitRequest = () => {
    Axios.post('/a;i/request', problemAreaArray, emergency, requestDetails, phoneNumber, email).then((res) => console.log(res.data))
  }

  
  return (
    <div>
      <Form id='request-form'>
        <section
          className='emergency-button'
          >
          <Form.Text  
          className='request-text-prompts'
          >Select all that apply:</Form.Text>

          <Button 
          variant='light'  
          id={emergency ? 'emergency-button' : 'unselected-emergency-button'}
          onClick={() => toggleEmergency(!emergency)}>EMERGENCY</Button>
        </section>
        <section id='problem-areas-list'>
        {problemAreas.map((problemArea) => {
          let capitalized = problemArea.charAt(0).toUpperCase() + problemArea.slice(1);
          return <Button 
              id={problemAreaArray.includes(problemArea) ? 'selected-button' : ''
            }
              variant='light'
              onClick={() => {
              setSelectedproblemArea(problemArea)
              console.log(selectedproblemArea)
              problemAreaToggler(problemArea)}}>{capitalized}</Button>;
        })}

        </section>
        <Form.Group >
          <Form.Text className='request-text-prompts' >Please explain your request in detail:</Form.Text>
          <Form.Control name='requestDetails' as='textarea' rows='3' placeholder="Explain here." onChange={(e) => setRequestDetails(e.target.value)}/>
        </Form.Group>
        <Form.Group >
          <Form.Text
          className='request-text-prompts'
          >
            Please upload a picture of the problem if necessary.
          </Form.Text>
          <Form.File />
          <Form.Text
          className='request-text-prompts'
          >
            Please leave the best contact information so we can get back to you regarding this request.
          </Form.Text>
          <Form.Control onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
          <Form.Control onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </Form.Group>
        <Button variant="light" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default MaintenanceRequest;
