import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ConfirmUser = (props) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState({});
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    Auth.confirmSignUp(query.get("username"), query.get("code")).then(
      (result) => {
        setConfirmationResult(result);
        setIsVerifying(false);
      }
    );
  }, [query]);

  const verifying = () => {
    return <div data-testid="user-verification">Verifying...</div>;
  };

  const verified = () => {
    return (
      <div data-testid="user-verification">
        Thank you for verifying your email
      </div>
    );
  };
  return isVerifying ? verifying() : verified();
};

export default ConfirmUser;
