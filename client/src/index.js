import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App.js";
import UserProvider from "./context/UserProvider";
import ErrorProvider from "./context/ErrorProvider";
import theme from "./context/ThemeProvider.js";
import { ThemeProvider } from "@emotion/react";

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <ErrorProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ErrorProvider>
    </ThemeProvider>
  </Router>,
  document.getElementById("root")
);
