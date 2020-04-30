import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "@reach/router";
import Divider from "@material-ui/core/Divider";
import customersApi from "api/customers";
import CustomerDetails from "../components/forms/CustomerDetails";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ContactInfo from "components/forms/ContactInfo";
import SuppliesEmail from "components/forms/SuppliesEmail";
import InvoiceBilling from "components/forms/InvoiceBilling";
import StoreCapacities from "components/forms/StoreCapacities";
import {
  setCustomerContactInfo,
  showHeaderSearch,
  showHeaderSearchResults,
  showHeaderCustomerDetails
} from "../js/actions/index";
import { store } from "../js/store/index";
import "../pages/CustomerProfile.css";
import { ClipLoader } from 'react-spinners';
import ErrorAlert from 'components/ErrorAlert'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  gridItem: {
    textAlign: "left",
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 30
  },
  panelDivider: {
    border: "none",
    minHeight: 900,
    margin: 0,
    backgroundColor: "#dbdbdb !important"
  },
  disabledIndicator: {
    borderBottom: '5px solid #e8e8e8',
  },
}));

function CustomerProfile() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [contactInfo, setContactInfo] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();

  const params = useParams();
  const customerId = params.searchId;
  const customerMarket = params.marketId;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    store.dispatch(showHeaderCustomerDetails(true));
    store.dispatch(showHeaderSearch(false));
    store.dispatch(showHeaderSearchResults(false));
  });

  const fetchCustomer = useCallback(() => {
    customersApi
      .getCustomerProfileById(customerId, customerMarket)
      .then(res => {
        const customer = res.data;
        setContactInfo(customer);
        store.dispatch(setCustomerContactInfo(customer));
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, [customerId, customerMarket]);

  useEffect(() => {
    setIsLoading(true);
    fetchCustomer();
  }, [fetchCustomer]);

  return (
    <div className="customer-wrapper">
      {isError && <ErrorAlert />}
      {!isError && (
        <div className="content-body">
          {!isLoading && (
            <Paper className="customer-detail-wrapper">
              <Tabs
                className={classes.tabRoot}
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
              <div className="container customer-profile-wrapper">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <span className="customer-details-headers">CUSTOMER DETAILS</span>
                    <CustomerDetails fields={contactInfo && contactInfo} />
                    <span className="customer-details-headers">
                      CONTACT INFORMATION
                    </span>
                    <ContactInfo fields={contactInfo && contactInfo} />
                    <span className="customer-details-headers">SUPPLIES EMAIL</span>
                    <SuppliesEmail fields={contactInfo && contactInfo} />
                  </div>
                  <div className="col-lg-1 col-md-1 divider-col">
                    <Divider
                      orientation="vertical"
                      className={classes.panelDivider}
                    />
                  </div>
                  <div className="col-lg-5 col-md-5" style={{ paddingLeft: "24px" }}>
                    <span className="customer-details-headers">
                      INVOICING & BILLING
                    </span>
                    <InvoiceBilling fields={contactInfo && contactInfo} />
                    <span className="customer-details-headers">STORE CAPACITIES</span>
                    <StoreCapacities fields={contactInfo && contactInfo} />
                  </div>
                </div>
              </div>
            </Paper>
          )}
          {isLoading && (<ClipLoader size={25} color={'#9B9B9B'} />)}
          <br />
        </div>
      )}
    </div>
  );
}

export default CustomerProfile;
