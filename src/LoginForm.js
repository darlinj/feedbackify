import React from 'react';
import {FormGroup, Button, FormControl, FormLabel} from 'react-bootstrap';

const LoginForm = props => {
  return (
    <div className="Login">
      <form className="login-form">
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl autoFocus name="email" cy-data="email" type="email" />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl name="password"  cy-data="password" type="password" />
        </FormGroup>
        <Button name="login-button" cy-data="login-button" variant="primary">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
