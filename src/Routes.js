import React from 'react';
import PageBody from './PageBody';
import QuestionsPage from './QuestionsPage';
import Signup from './Signup';
import LoginForm from './LoginForm';
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
      <Route path="/request/:id">
        <QuestionsPage {...params} />
      </Route>
      <Route path="/">
        <PageBody {...params} />
      </Route>
    </Switch>
  );
};

export default Routes;
