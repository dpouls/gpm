import React, { useState, useEffect } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const processPayment = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      console.log(paymentMethod);
      try {
        const { data } = await axios.post("/api/charge", {
          id,
          amount: 100000,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={processPayment} style={{ width: "100%" }}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

// const stripePromise = loadStripe('pk_test_51GqmlILOk5enFzP0jCzXNWAIA18l7HQ1a72yq7831eOFrXlIPQtWEOQheiDaVzzKvy8nr2jLNomE6U3Y5mHDu9oo00A0NpNvdf')
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Pay = (props) => {
  const [card, toggleCard] = useState(false);
  const [bank, toggleBank] = useState(false);

  return (
    <div className="pay-page-container">
      <div>
        <p>Total rent due: </p>
      </div>
      <div className="pay-buttons-container">
        <button onClick={() => toggleCard(!card)}>
          I want to pay with card
        </button>
        {card ? (
          <Elements stripe={stripePromise}>
            <CardForm />
          </Elements>
        ) : null}
        {/* <button onClick={() => toggleBank(!bank)}> */}
        <button
          onClick={() =>
            console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
          }
        >
          I want to pay with my bank account
        </button>
        {bank ? <div>bank info goes here</div> : null}
      </div>
    </div>
  );
};

export default Pay;
