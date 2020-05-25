import React from 'react';
import {FormGroup, Button, FormControl, FormLabel} from 'react-bootstrap';

const LoginForm = props => {
  const credentials = props.credentials || {}
  return (
    <div className="Login">
      <form onSubmit={props.login} className="login-form">
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl autoFocus name="email" cy-data="email" type="email" onChange={props.setCredentials} value={credentials.email}/>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl name="password"  cy-data="password" type="password" onChange={props.setCredentials} value={credentials.password} />
        </FormGroup>
        <Button name="login-button" type="submit" cy-data="login-button" variant="primary">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
