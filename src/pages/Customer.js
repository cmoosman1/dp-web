import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  showHeaderSearch,
  showHeaderSearchResults,
  showHeaderCustomerDetails
} from "../js/actions/index";
import { store } from "../js/store/index";
import "../pages/Customer.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function Customer() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    store.dispatch(showHeaderCustomerDetails(true));
    store.dispatch(showHeaderSearch(false));
    store.dispatch(showHeaderSearchResults(false));
  });

  return (
    <div className="customer-wrapper">
      <Paper className="customer-detail-wrapper">
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="Customer Details"
        >
          <Tab label="PROFILE" />
          <Tab label="ORDERS" disabled />
          <Tab label="SALES HISTORY" disabled />
          <Tab label="ROUTING" disabled />
          <Tab label="EVENTS" disabled />
          <Tab label="EPI MAPPING" disabled />
          <Tab label="MESSAGES" disabled />
          <Tab label="CSR NOTES" disabled />
        </Tabs>
      </Paper>
    </div>
  );
}

export default Customer;
