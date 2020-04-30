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
import "./Orders.css";

function Orders(props) {
  useEffect(() => {
    store.dispatch(showHeaderSearch(false));
    store.dispatch(showOrdersHeader(true));
    store.dispatch(showHeaderSearchResults(false));
    store.dispatch(showHeaderCustomerDetails(false));
  }, []);

  return (
    <DocumentTitle title='Traximize - Orders'>
      <div className="customer-wrapper">
        <SideNav />
        <div className="content-wrapper">
          <Header
            sectionTitle="Orders"
            buttonTitle="Add New Customer"
          />
          <div className="content-body">{props.children}</div>
        </div>
      </div>
    </DocumentTitle>
  );
}

Orders.propTypes = {
  children: PropTypes.any
};

export default Orders;
