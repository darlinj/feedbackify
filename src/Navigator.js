import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';

const Navigator = props => {
  console.log(props.currentUser)

  return (
    <Navbar>
      <Navbar.Brand href="/">{props.title}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto"></Nav>
        <Nav>
          { props.currentUser.isLoggedIn ? <a className="login-action" href="">log out</a> : <a className="login-action" href="">login</a> } 
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigator;
