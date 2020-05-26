import React, {useState} from 'react';
import {FormGroup, Button, FormControl, FormLabel} from 'react-bootstrap';
import {login} from './authentication';

const LoginForm = props => {
  const [credentials, setCredentials] = useState({email: '', password: ''});

  const handleLogin = data => {
    login(credentials.email, credentials.password);
    if (typeof props.setAuthenticationStatus === 'function') {
      props.setAuthenticationStatus(true);
    }
  };

  const handleCredentials = event => {
    credentials[event.target.name] = event.target.value;
    setCredentials(credentials);
  };

  return (
    <div className="Login">
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
          variant="primary">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
