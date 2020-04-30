import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "context/auth-context";

function AuthenticatedRoute(props) {
  const { user, isUserLoading, login } = useAuth();
  console.log("Checking auth", isUserLoading, user);
  if (!isUserLoading && !user) {
    login();
  }
  return <div>{props.children}</div>;
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.any
};

export default AuthenticatedRoute;
