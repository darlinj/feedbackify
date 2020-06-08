import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {logout} from './authentication';

const Navigator = props => {
  const handleLogout = async event => {
      await logout();
      //setAuthenticated(false);
  //    props.history.push('/login');
  };

  return (
    <Navbar>
      <Navbar.Brand href="/">{props.title}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto"></Nav>
        <Nav>
          {props.currentUser ? (
            <a className="login-action" cy-data="login-action" onClick={handleLogout} href="">
              log out
            </a>
          ) : (
            <a className="login-action" cy-data="login-action" href="">
              login
            </a>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigator;
