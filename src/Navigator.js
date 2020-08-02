import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {logout} from './authentication';
import {Link} from 'react-router-dom';

const Navigator = props => {
  const handleLogout = async event => {
      await logout();
  };

  return (
    <Navbar>
      <Navbar.Brand href="/">{props.title}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto"></Nav>
        <Nav>
          {props.currentUser ? (
            <a className="login-action" cy-data="login-action" onClick={handleLogout} href="/">
              log out
            </a>
          ) : (
            <>
            <Link className="signup-action" cy-data="signup-action" style={{marginRight: "10px"}} to="/signup">
              signup
            </Link> {' | '}
            <Link className="login-action" cy-data="login-action" style={{marginLeft: "10px"}} to="/login">
              login
            </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigator;
