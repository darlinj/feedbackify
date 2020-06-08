import React, {useState, useEffect} from 'react';
import './App.css';
import PageBody from './PageBody';
import Navigator from './Navigator';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { getCurrentUser } from './authentication';
Amplify.configure(awsconfig);

function App() {
  const [currentUser, setCurrentUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        console.log(user)
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log(error)
        setCurrentUser(undefined);
      });
    setIsLoading(false);
  }, []);

  return (
    <Container fluid={true} className="App">
      <Navigator title="Feedbackify" currentUser={currentUser} isLoading={isLoading} />
      <PageBody currentUser={currentUser} setCurrentUser={setCurrentUser} isLoading={isLoading} />
    </Container>
  );
}

export default App;
