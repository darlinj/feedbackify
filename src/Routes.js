import React from "react";
import QuestionsPage from "./QuestionsPage";
import Signup from "./Signup";
import LoginForm from "./LoginForm";
import HomePage from "./HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { Switch, Route } from "react-router-dom";

const Routes = params => {
  return (
    <Switch>
      <Route path="/login">
        <LoginForm {...params} />
      </Route>
      <Route path="/signup">
        <Signup {...params} />
      </Route>
      <ProtectedRoute
        {...params}
        component={QuestionsPage}
        path="/questionnaire/:id"
      />
      <Route path="/">
        <HomePage {...params} />
      </Route>
    </Switch>
  );
};

export default Routes;
