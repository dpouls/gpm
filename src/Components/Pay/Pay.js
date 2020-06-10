import React, { useState, useEffect } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from "react-bootstrap/Spinner";
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom'

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CardForm = (props) => {
  const [processing, toggleProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  console.log('cardform',props)

  const processCardPayment = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      console.log(paymentMethod);
      try {
        const { data } = await axios
          .post("/api/charge", {
            id,
            amount: 100000,
          })
          .then((res) => {
            props.PayProps.history.push('/')
            swal("Success", "Your payment was completed!", "success");
          });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {processing ? (
        <Spinner
          animation="border"
          variant="black"
          style={{ height: "300px", width: "300px" }}
        />
      ) : (
        <form
          className="card_form"
          onSubmit={(e) => {
            // props.toggleCard(false)
            processCardPayment(e);
            // toggleProcessing(true);
          }}
        >
          <CardElement className="card_element" />
          <button
            id="pay_button"
            type="submit"
            disabled={processing || !stripe}
          >
            Pay
          </button>
        </form>
      )}
    </>
  );
};

// const stripePromise = loadStripe('pk_test_51GqmlILOk5enFzP0jCzXNWAIA18l7HQ1a72yq7831eOFrXlIPQtWEOQheiDaVzzKvy8nr2jLNomE6U3Y5mHDu9oo00A0NpNvdf')
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Pay = (props) => {
  const [card, toggleCard] = useState(false);
  const [bank, toggleBank] = useState(false);
  console.log('payprops',props)
  return (
    <div className="pay-page-container">
      <div>
        <p>Total rent due: </p>
      </div>
      <div className="pay-buttons-container">
        <button
          onClick={() => {
            toggleCard(!card);
          }}
        >
          I want to pay with card
        </button>
        {card ? (
          <Elements stripe={stripePromise}>
            <CardForm PayProps={props} toggleCard={toggleCard} card={card} />
          </Elements>
        ) : null}
        <button onClick={() => toggleBank(!bank)}>
          I want to pay with my bank account
        </button>
        {bank ? <div>bank info goes here</div> : null}
      </div>
    </div>
  );
};

export default withRouter(Pay);
