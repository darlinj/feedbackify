import React from 'react';
import QuestionsPage from './QuestionsPage';
import Signup from './Signup';
import LoginForm from './LoginForm';
import WelcomePage from './WelcomePage';
import ProtectedRoute from './ProtectedRoute';
import {Switch, Route} from 'react-router-dom';

const Routes = (params) => {
  return (
    <Switch>
      <Route path="/login">
        <LoginForm {...params} />
      </Route>
      <Route path="/signup">
        <Signup {...params} />
      </Route>
      <ProtectedRoute {...params} component={QuestionsPage} path="/request/:id" />
      <Route path="/">
        <WelcomePage {...params} />
      </Route>
    </Switch>
  );
};

export default Routes;
