import React from 'react';
import './App.css';
import LoginForm from './LoginForm';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <Container fluid={true} className="App">
      <h1>feedbackify</h1>
      <LoginForm />
    </Container>
  );
}

export default App;
