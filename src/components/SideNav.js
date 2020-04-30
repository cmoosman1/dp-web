import React, { useState, Fragment, useEffect } from "react";
import { Link, useMatch } from "@reach/router";
import clsx from "clsx";
import { store } from "../js/store/index";
import { setSideNavToggle } from "../js/actions/index";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Icon, IconButton, CssBaseline, Drawer } from "@material-ui/core/";
import navLogo from "assets/images/navLogo.png";
import { useAuth } from "context/auth-context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faFileAlt, faUser } from '@fortawesome/pro-regular-svg-icons'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const drawerWidth = 300;


function SideNav() {
  const { logout, user } = useAuth();
  const sideNavToggle = useSelector(state => state.setSideNavToggle);
  const ordersRouteMatch = useMatch("/orders/*")
  const customersRouteMatch = useMatch("/customers/*")
  const [ordersActive, setOrdersActive] = useState()
  const [customersActive, setCustomersActive] = useState()
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    drawer: {
      backgroundColor: "#17374E",
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      backgroundColor: "#17374E",
      width: drawerWidth,
      // transition: theme.transitions.create("margin", {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.enteringScreen
      // })
    },
    drawerClose: {
      backgroundColor: "#17374E",
      // transition: theme.transitions.create("margin", {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen
      // }),
      overflowX: "hidden",
      width: 165,
      [theme.breakpoints.up("sm")]: {
        width: 165
      }
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginRight: 20,
      marginTop: 16,
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    navigationArrow: {
      color: "#FFFFFF",
      fontSize: 14,
      marginLeft: 12,
      opacity: "0.5",
      paddingTop: 2
    },
    userDropdownArrow: {
      color: "#FFFFFF",
      fontSize: 12,
      marginLeft: 65,
      opacity: "0.5",
    },
    logoText: {
      height: 30,
      width: 112,
      color: "#F7C757",
      fontFamily: "Montserrat",
      fontSize: 14,
      fontWeight: "bold",
      paddingTop: 5,
      paddingRight: sideNavToggle ? 23 : 0
    },
    logo: {
      minHeight: 68,
      width: 100,
      marginRight: sideNavToggle ? 23 : 0
    },
    buttonWrapper: {
      padding: "unset !important"
    },
    logout: {
      position: 'fixed',
      bottom: 0,
    },
    ordersActive: {
      border: '2px solid red'
    },
    customersActive: {
      border: '2px solid yellow'
    },
    customerExpandedBackground: {
      backgroundColor: customersActive ? '#25465e' : null,
      borderLeft: customersActive ? 'solid 4px #ffb100' : 'solid 4px transparent',
      height: 40,
      marginTop: 20,
      width: '100%',
    },
    ordersExpandedBackground: {
      backgroundColor: ordersActive ? '#25465e' : null,
      borderLeft: ordersActive ? 'solid 4px #ffb100' : 'solid 4px transparent',
      height: 40,
      marginTop: 20,
      width: '100%',
    },
    orderNavItem: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      paddingLeft: 17,
      '& a:hover': {
        color: ordersActive ? '#25465e' : '#fff',
      }
    },
    customerNavItem: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      paddingLeft: 13,
      '& a:hover': {
        color: customersActive ? '#25465e' : '#fff',
      }
    },
    logoutTooltip: {
      color: '#000000',
      fontFamily: '"Roboto", sans-serif',
      fontSize: 15,
      fontWeight: '500',
      paddingLeft: 20,
      paddingBottom: 6
    },
    logoutName: {
      cursor: 'pointer',
      color: '#008898',
      borderTop: '1px solid #DBDBDB',
      width: 230,
      paddingTop: 7,
      paddingLeft: 20,
      fontFamily: '"Roboto", sans-serif',
      fontSize: 15
    },
    logoutNameExpanded: {
      cursor: 'pointer',
      color: '#008898',
      borderTop: '1px solid #DBDBDB',
      width: 238,
      paddingTop: 7,
      paddingLeft: 20,
      fontFamily: '"Roboto", sans-serif',
      fontSize: 15
    }
  }));
  const classes = useStyles();

  const toggleDrawer = () => {
    store.dispatch(sideNavToggle ? setSideNavToggle(false) : setSideNavToggle(true));
  };

  useEffect(() => {
    if (ordersRouteMatch) {
      return ordersRouteMatch.uri === '/orders' ? setOrdersActive(true) : null
    }
    if (customersRouteMatch) {
      return customersRouteMatch.uri === '/customers' ? setCustomersActive(true) : null
    }
  }, [ordersRouteMatch, customersRouteMatch])

  function LogoutTooltipCollapsed() {
    const content =
      <div>
        <div className={classes.logoutTooltip}>
          <FontAwesomeIcon icon={faUser} style={{ color: '#ca8500', fontSize: 17, marginRight: 8 }} /> {user ? user.profile.name : "Username"}
        </div>
        <div onClick={logout} onKeyDown={logout} role="button" tabIndex="0" className={classes.logoutName}>Logout {user ? user.profile.name : "Username"}</div>
      </div>
    const arrowContent = <div className="rc-tooltip-arrow-inner"></div>
    return (
      <Tooltip
        className={classes.tooltip}
        placement="right"
        overlay={content}
        arrowContent={arrowContent}
      >
        <FontAwesomeIcon icon={faUser} style={{ color: '#ffffff', fontSize: 17, cursor: 'pointer' }} />
      </Tooltip>

    );
  }
  function LogoutTooltipExpanded() {
    const content =
      <div>
        <div className={classes.logoutTooltip}>
          <FontAwesomeIcon icon={faUser} style={{ color: '#ca8500', fontSize: 17, marginRight: 8 }} /> {user ? user.profile.name : "Username"}
        </div>
        <div onClick={logout} onKeyDown={logout} role="button" tabIndex="0" className={classes.logoutNameExpanded}>Logout {user ? user.profile.name : "Username"} </div>
      </div>
    const arrowContent = <div className="rc-tooltip-arrow-inner"></div>
    return (
      <Tooltip
        className={classes.tooltip}
        placement="topRight"
        overlay={content}
        arrowContent={arrowContent}
      >
        <IconButton disableRipple disableFocusRipple>
          <Fragment>
            <Icon
              className={`fas fa-chevron-down ${classes.userDropdownArrow}`}
            />
          </Fragment>
        </IconButton>
      </Tooltip>

    );
  }

  return (
    <div>
      <CssBaseline />
      <Icon
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        edge="start"
        className={clsx(classes.menuButton, {
          [classes.hide]: sideNavToggle
        })}
      >
        <Icon />
      </Icon>
      <Drawer
        transitionDuration={0}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: sideNavToggle,
          [classes.drawerClose]: !sideNavToggle
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: sideNavToggle,
            [classes.drawerClose]: !sideNavToggle
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton disableRipple disableFocusRipple onClick={toggleDrawer} className={classes.buttonWrapper}>
            <img src={navLogo} alt="" className={classes.logo} />
            {sideNavToggle && (<span className={classes.logoText}>TRAXIMIZE</span>)}
            {!sideNavToggle ? (
              <Fragment>
                <Icon
                  className={`fas fa-chevron-right ${classes.navigationArrow}`}
                />
              </Fragment>
            ) : (
                <Fragment>
                  <Icon
                    className={`fas fa-chevron-left ${classes.navigationArrow}`}
                  />
                </Fragment>
              )}
          </IconButton>
        </div>
        <span className={!sideNavToggle ? "customer-collapsed" : classes.customerExpandedBackground}>
          <Link to="/customers/search">
            <FontAwesomeIcon icon={faUsers} className={`${!sideNavToggle ? "customer-icon" : "customer-expanded"}`}
              style={{ color: customersActive ? '#ca8500' : '#ffffff' }}>
            </FontAwesomeIcon>
            {!sideNavToggle ? null : (
              <Link className={classes.customerNavItem} to="/customers/search" style={{ color: customersActive ? '#ca8500' : '#ffffff' }}>
                Customers
              </Link>
            )}
          </Link>
        </span>
        <span className={!sideNavToggle ? "customer-collapsed" : classes.ordersExpandedBackground}>
          <Link to="/orders/search">
            <FontAwesomeIcon icon={faFileAlt} className={`${!sideNavToggle ? "order-icon" : "order-expanded"}`}
              style={{ color: ordersActive ? '#ca8500' : '#ffffff' }}>
            </FontAwesomeIcon>
            {!sideNavToggle ? null : (
              <Link className={classes.orderNavItem} to="/orders/search" style={{ color: ordersActive ? '#ca8500' : '#ffffff' }}>
                Orders
              </Link>
            )}
          </Link>
        </span>
        <div className={!sideNavToggle ? 'username-sidenav' : 'username-sidenav-expanded'}>
          {!sideNavToggle && (
            <LogoutTooltipCollapsed />
          )}
          {sideNavToggle && (
            <FontAwesomeIcon icon={faUser} style={{ color: '#ffffff', fontSize: 17 }} />
          )}
          {!sideNavToggle ? null : (
            <span style={{ marginLeft: 17 }}>{user ? user.profile.name : "Username"}</span>
          )}
          {sideNavToggle && (
            <LogoutTooltipExpanded />
          )}
        </div>
      </Drawer>
    </div >
  );
}

export default SideNav;
