import PropTypes from "prop-types";
import React from "react";
import { useAuth } from "context/auth-context";
import { navigate } from "@reach/router";

export function LoginRedirect(props) {
  var { signinRedirectCallback } = useAuth();
  signinRedirectCallback(props.location.href).then(() => {
    navigate("/");
  });

  return <p>Redirecting....</p>;
}

LoginRedirect.propTypes = {
  code: PropTypes.string,
  location: PropTypes.any
};

export default LoginRedirect;
