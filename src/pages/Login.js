import React from "react";
import { useAuth } from "context/auth-context";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import landingPageLogo from "assets/images/DPLogo.jpg";

const useStyles = makeStyles(() => ({
  btnBlack: {
    color: "#fff",
    height: "40px",
    padding: "unset !important",
    width: "185px",
    textTransform: "unset !important"
  },
  panelDivider: {
    border: "1px solid #dbdbdb",
    minHeight: 100,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
    backgroundColor: "#dbdbdb !important"
  },
  logo: {
    width: 500
  },
  logoText: {
    color: "#17374e",
    fontFamily: "Montserrat",
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 5,
    marginBottom: 10,
    width: "100%"
  }
}));

export function Login() {
  const classes = useStyles();
  const { login, logout } = useAuth();
  return (
    <div className="container login-wrapper">
      <div className="row text-center">
        <div className="col">
          <img src={landingPageLogo} alt="logo" className={classes.logo} />
        </div>
      </div>
      <div className="row text-center mb-20">
        <div className="col">
          <span className={classes.logoText}>TRAXIMIZE Management System</span>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-md-6">
          <Button
            variant="contained"
            className={classes.btnBlack}
            onClick={login}
            style={{ float: "right" }}
          >
            Login
          </Button>
        </div>
        <div className="col-md-6">
          <Button
            variant="contained"
            className={classes.btnBlack}
            onClick={logout}
            style={{ float: "left" }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
