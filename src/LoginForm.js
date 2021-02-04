import React, { useState } from "react";
import { FormGroup, Button, FormControl, FormLabel } from "react-bootstrap";
import { login } from "./authentication";
import { useHistory } from "react-router-dom";

const LoginForm = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const history = useHistory();
  const [loginStatus, setLoginStatus] = useState({ state: "initializing" });

  const handleLogin = (event) => {
    event.preventDefault();
    login(credentials.email, credentials.password)
      .then((currentUser) => {
        if (typeof props.setCurrentUser === "function") {
          props.setCurrentUser(currentUser);
          history.push("/");
        }
      })
      .catch((error) => {
        setLoginStatus({
          ...loginStatus,
          state: "error",
          message: error.message,
        });
      });
  };

  const handleCredentials = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const loginFailureMessage = (loginStatus) => {
    return (
      <>
        <div>Login Failed</div>
        <div>{loginStatus.message}</div>
      </>
    );
  };

  return (
    <div className="Login">
      {loginStatus.state === "error" ? loginFailureMessage(loginStatus) : ""}
      <form onSubmit={handleLogin} className="login-form">
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            name="email"
            cy-data="email"
            type="email"
            onChange={handleCredentials}
            value={credentials.email}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            name="password"
            cy-data="password"
            type="password"
            onChange={handleCredentials}
            value={credentials.password}
          />
        </FormGroup>
        <Button
          name="login-button"
          type="submit"
          cy-data="login-button"
          variant="primary"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
