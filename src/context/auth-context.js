import React, { useEffect, useState } from "react";
import { Log, UserManager } from "oidc-client";
import config from "config";
import { navigate } from "@reach/router";
const AuthContext = React.createContext();

function AuthProvider(props) {
  console.log(config);
  const settings = {
    authority: config.REACT_APP_STS_AUTHORITY,
    client_id: config.REACT_APP_CLIENT_ID,
    redirect_uri: `${config.REACT_APP_URI}login/redirect`,
    silent_redirect_uri: `${config.REACT_APP_URI}login/redirect`,
    post_logout_redirect_uri: `${config.REACT_APP_URI}`,
    response_type: "code",
    scope: config.REACT_APP_CLIENT_SCOPE
  };

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userManager = new UserManager(settings);

  useEffect(() => {
    const getUser = async () => {
      let user = await userManager.getUser();
      if (user) {
        setUser(user);
        navigate("/orders/search");
      }
      setIsLoading(false);
      console.log("got user", user);
    };
    setIsLoading(true);
    getUser();
    // eslint-disable-next-line
  }, []);

  Log.logger = console;
  Log.level = Log.INFO;

  const signinRedirectCallback = () => {
    return userManager.signinRedirectCallback().then(loggedInUser => {
      if (loggedInUser) {
        setUser(loggedInUser);

      }

      console.log("signed in user", loggedInUser);
    });
  };

  const login = () => {
    return userManager.signinRedirect();
  };

  const logout = () => {
    return userManager.signoutRedirect();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isUserLoading: isLoading,
        signinRedirectCallback /*register*/
      }}
      {...props}
    />
  );
}

AuthProvider.propTypes = {};

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };
