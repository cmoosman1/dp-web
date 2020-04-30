const local = {
  REACT_APP_STS_AUTHORITY: "http://192.168.50.71/Traximize.Web.IdentityServer",
  REACT_APP_CLIENT_ID: "dp-web-dev",
  REACT_APP_URI: "http://localhost:3000/",
  REACT_APP_CLIENT_SCOPE: "openid profile traximizeAPI"
};

const dev = {
  REACT_APP_STS_AUTHORITY: "http://192.168.50.71/Traximize.Web.IdentityServer",
  REACT_APP_CLIENT_ID: "dp-web-dev",
  REACT_APP_URI: "http://192.168.50.71:90/",
  REACT_APP_CLIENT_SCOPE: "openid profile traximizeAPI"
};

const staging = {
  REACT_APP_STS_AUTHORITY: "http://192.168.50.71/Traximize.Web.IdentityServer",
  REACT_APP_CLIENT_ID: "dp-web-staging",
  REACT_APP_URI: "http://192.168.50.71:85/",
  REACT_APP_CLIENT_SCOPE: "openid profile traximizeAPI"
};

const prod = {
  REACT_APP_STS_AUTHORITY: "http://192.168.50.71/Traximize.Web.IdentityServer",
  REACT_APP_CLIENT_ID: "dp-web-prod",
  REACT_APP_URI: "http://192.168.50.71:81/",
  REACT_APP_CLIENT_SCOPE: "openid profile traximizeAPI"
};

let config = local;

if (process.env.REACT_APP_STAGE === "dev") {
  config = dev;
} else if (process.env.REACT_APP_STAGE === "staging") {
  config = staging;
} else if (process.env.REACT_APP_STAGE === "prod") {
  config = prod;
}

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
