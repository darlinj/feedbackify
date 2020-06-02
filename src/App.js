import React, {useState} from 'react';
import './App.css';
import LoginForm from './LoginForm';
import Navigator from './Navigator';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  const [currentUser, setCurrentUser] = useState({isLoggedIn: false})
  return (
    <Container fluid={true} className="App">
      <Navigator title="Feedbackify" currentUser={currentUser} />
      <LoginForm setCurrentUser={setCurrentUser} />
    </Container>
  );
}

export default App;
