import React, { Component } from "react";
import { Router } from "@reach/router";
import Customers from "pages/Customers";
import { AuthProvider } from "context/auth-context";
import Root from "pages/Root";
import Login from "pages/Login";
import LoginRedirect from "pages/LoginRedirect";
import Home from "pages/Home";
import AuthenticatedRoute from "pages/AuthenticatedRoute";
import SearchResult from "pages/SearchResult";
import SearchContent from "components/SearchContent";
import Customer from "pages/Customer";
import CustomerProfile from "pages/CustomerProfile";
import Orders from "pages/Orders";
import OrdersContent from "components/OrdersContent";
import InvoiceContent from "components/InvoiceContent";
import InvoicesResult from "pages/InvoicesResult";
import PDFGenerator from "components/PDFGenerator";

class App extends Component {
  render() {
    return (
      <div>
        <AuthProvider>
          <Router>
            <Root path="/">
              <AuthenticatedRoute path="/">
                <Home path="/" />
                <Customers path="customers">
                  <SearchContent path="search" />
                  <SearchResult path="searchresult/:searchId" />
                  <Customer path="customer/:searchId" />
                  <CustomerProfile path="customer/profile/:searchId/:marketId" />
                </Customers>
                <Orders path="orders">
                  <OrdersContent path="search" />
                  <InvoicesResult path="invoices/:market/:orderType/:month/:day/:year" />
                  <InvoiceContent path="invoicecontent" />
                </Orders>
                <PDFGenerator path="invoice-pdf" />
              </AuthenticatedRoute>
              <Login path="login" />
              <LoginRedirect path="login/redirect" />
            </Root>
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
