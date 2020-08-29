import React from "react";
import QuestionsPage from "./QuestionsPage";
import Signup from "./Signup";
import LoginForm from "./LoginForm";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import FeedbackPage from "./FeedbackPage";
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
      <Route exact path="/">
        <HomePage {...params} />
      </Route>
      <Route path="/feedback/:id" component={FeedbackPage} />
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default Routes;
