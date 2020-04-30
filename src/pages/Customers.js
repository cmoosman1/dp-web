import React, { useEffect } from "react";
import DocumentTitle from 'react-document-title'
import PropTypes from "prop-types";
import Header from "components/Header";
import SideNav from "../components/SideNav";
import {
  showHeaderSearch,
  showOrdersHeader,
  showHeaderSearchResults,
  showHeaderCustomerDetails
} from "../js/actions/index";
import { store } from "../js/store/index";
import "./Customers.css";

function Customers(props) {
  useEffect(() => {
    store.dispatch(showHeaderSearch(false));
    store.dispatch(showOrdersHeader(false));
    store.dispatch(showHeaderSearchResults(false));
    store.dispatch(showHeaderCustomerDetails(false));
  }, []);

  return (
    <DocumentTitle title='Traximize - Customers'>
      <div className="customer-wrapper">
        <SideNav />
        <div className="content-wrapper">
          <Header
            sectionTitle="Customers"
            buttonTitle="Add New Customer"
          />
          <div className="content-body">{props.children}</div>
        </div>
      </div>
    </DocumentTitle>
  );
}

Customers.propTypes = {
  children: PropTypes.any
};

export default Customers;
