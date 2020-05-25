import React, {useState} from 'react';
import './App.css';
import LoginForm from './LoginForm';
import Navigator from './Navigator';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [credentials, setCredentials] = useState({email: "", password: ""})
  return (
    <Container fluid={true} className="App">
      <Navigator title="Feedbackify" />
      <LoginForm credentials={credentials} setCredentials={setCredentials} />
    </Container>
  );
}

export default App;
