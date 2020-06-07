import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';

const Navigator = props => {
  return (
    <Navbar>
      <Navbar.Brand href="/">{props.title}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto"></Nav>
        <Nav>
          { props.currentUser ? <a className="login-action" cy-data="login-action" href="">log out</a> : <a className="login-action" href="">login</a> } 
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigator;
