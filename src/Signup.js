import React, { useState } from "react";
import { FormGroup, Button, FormControl, FormLabel } from "react-bootstrap";
import { signup } from "./authentication";

const Signup = (props) => {
  const [signUpData, updateSignUpData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [registrationInProgres, updateRegistrationInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMessage("Those passwords don't match,  Please try again");
      return;
    }
    signup(signUpData.email, signUpData.name, signUpData.password)
      .then(([result, message]) => {
        if (result) {
          updateRegistrationInProgress(true);
        } else {
          updateRegistrationInProgress(false);
          setErrorMessage(message);
        }
      })
      .catch((error) => {
        updateRegistrationInProgress(false);
        setErrorMessage(error);
      });
  };

  const onChange = (event) => {
    updateSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const signUpPage = () => {
    return (
      <div className="signup">
        <h1>Register with reflectify</h1>
        <div className="signup-message">
          {errorMessage === "" ? (
            ""
          ) : (
            <h1>Registration failed: {errorMessage}</h1>
          )}
        </div>
        <form onSubmit={handleSignup} className="signup-form">
          <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              name="email"
              cy-data="email"
              type="email"
              onChange={onChange}
              value={signUpData.email}
            />
          </FormGroup>
          <FormGroup controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              autoFocus
              name="name"
              cy-data="name"
              onChange={onChange}
              value={signUpData.name}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              name="password"
              cy-data="password"
              type="password"
              onChange={onChange}
              value={signUpData.password}
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword">
            <FormLabel>Confirm password</FormLabel>
            <FormControl
              name="confirmPassword"
              cy-data="confirm-password"
              type="password"
              onChange={onChange}
              value={signUpData.confirmPassword}
            />
          </FormGroup>
          <Button
            name="signup-button"
            type="submit"
            cy-data="signup-button"
            variant="primary"
          >
            Signup
          </Button>
        </form>
      </div>
    );
  };

  const registrationInProgresPage = () => {
    return (
      <div className="signup-message">
        <h1>
          Registration successful. Please check your email and confirm your
          account
        </h1>
      </div>
    );
  };

  return (
    <>{registrationInProgres ? registrationInProgresPage() : signUpPage()}</>
  );
};

export default Signup;
