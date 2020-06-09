import React from 'react';
import PageBody from './PageBody';
import Signup from './Signup';
import {Switch, Route} from 'react-router-dom';

const Routes = (params) => {
  return (
    <Switch>
      <Route path="/signup">
        <Signup {...params} />
      </Route>
      <Route path="/">
        <PageBody {...params} />
      </Route>
    </Switch>
  );
};

export default Routes;
