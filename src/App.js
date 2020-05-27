import React, {useState} from 'react';
import './App.css';
import LoginForm from './LoginForm';
import Navigator from './Navigator';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentUser, setCurrentUser] = useState()
  return (
    <Container fluid={true} className="App">
      <Navigator title="Feedbackify" />
      <LoginForm setCurrentUser={setCurrentUser} />
    </Container>
  );
}

export default App;
