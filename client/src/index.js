import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App.js";
import UserProvider from "../context/UserProvider";
import ErrorProvider from "../context/ErrorProvider";

ReactDOM.render(
  <Router>
    <ErrorProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ErrorProvider>
  </Router>,
  document.getElementById("root")
);
