import React from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import routes from "./routes";
import { withRouter } from "react-router-dom";

function App(props) {

  return (
    <div className="App">
      {props.location.pathname !== "/login" ? (
        <>
          <Header />
          {routes}
        </>
      ) : (
        <> {routes} </>
      )}
    </div>
  );
}

export default withRouter(App);
