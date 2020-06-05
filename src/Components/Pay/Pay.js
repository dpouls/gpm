import React, { useState, useEffect } from "react";
import "./Pay.scss";
function Pay(props) {

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
        {card ? <div>stripe info goes here</div> : null}
        <button onClick={() => toggleBank(!bank)}>
          I want to pay with my bank account
        </button>
        {bank ? <div>bank info goes here</div> : null}
      </div>

    </div>
  );
}

export default Pay;
