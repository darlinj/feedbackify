import React, { useState, useEffect } from "react";
import Navigator from "./Navigator";
import { Container } from "react-bootstrap";
import Amplify from "aws-amplify";
import awsConfig from "./aws-exports";
import { getCurrentUser } from "./authentication";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes.js";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

Amplify.configure(awsConfig);

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(user => {
        setCurrentUser(user);
      })
      .catch(error => {
        setCurrentUser(undefined);
      });
    setIsLoading(false);
  }, []);

  return (
    <Router>
      <Container fluid={true} className="App">
        <ToastContainer />
        <Navigator
          title="Feedbackify"
          currentUser={currentUser}
          isLoading={isLoading}
        />
        <div role="page-body">
          <Routes
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            isLoading={isLoading}
          />
        </div>
      </Container>
    </Router>
  );
}

export default App;
