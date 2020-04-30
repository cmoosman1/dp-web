/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { navigate } from "@reach/router";
import {
  ClickAwayListener,
  Typography,
  Breadcrumbs,
  Link,
  Button
} from "@material-ui/core";
import { Search } from "@tallwave/dp-ui";
import axios from "axios";
import _ from "lodash";
import Moment from "react-moment";
import pdfApi from "api/pdf";
import "./Header.css";
import { ClipLoader } from 'react-spinners'
// import FileDownload from 'js-file-download'

const Searcheader = props => {
  const { sectionTitle } = props;
  return (
    <div className="flex-grid-thirds format-spacing">
      <div className="col">
        <h2>{sectionTitle}</h2>
      </div>
    </div>
  );
};

const OrdersHeader = props => {
  const { sectionTitle } = props;
  return (
    <div className="flex-grid-thirds format-spacing">
      <div className="col">
        <h2>{sectionTitle}</h2>
      </div>
    </div>
  );
}

const SearchResultsHeader = props => {
  const [isRecentEmpty, setIsRecentEmpty] = useState(null);
  const [showRecent, setShowRecent] = useState(false);
  const [searching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([{}]);
  const [recentSearchTerms, setRecentSearchTerms] = useState([])
  const initialSearchTermValue = useSelector(state => state.setSearchTerm);
  const [searchTerm, setSearchTerm] = useState(initialSearchTermValue);


  const handleDropdownFocus = () => {
    if (searchTerm.length === 0 && !isRecentEmpty) {
      setShowRecent(true);
    }
  };

  const isEmpty = recentSearchTerms => {
    const obj = recentSearchTerms;
    return Object.values(obj).every(x => x === null || x === "")
      ? setIsRecentEmpty(true)
      : setIsRecentEmpty(false);
  };

  useEffect(() => {
    if (localStorage.getItem('recentSearchTerms')) {
      setRecentSearchTerms(JSON.parse(localStorage.getItem('recentSearchTerms')))
    } else {
      localStorage.setItem('recentSearchTerms', JSON.stringify(recentSearchTerms));
      isEmpty(recentSearchTerms)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('recentSearchTerms', JSON.stringify(recentSearchTerms));
    isEmpty(recentSearchTerms)
  }, [recentSearchTerms])

  function handleChange(e) {
    const value = e.target.value;

    setSearchTerm(value);

    const search = _.debounce(searchByText, 500);
    search(value);
    setShowSearchResults(true);

    if (value.length >= 1) {
      setShowRecent(false);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

    if (value.length === 0 && isRecentEmpty) {
      setShowSearchResults(false);
    }

    if (value.length === 0 && !isRecentEmpty) {
      setShowRecent(true);

      setShowSearchResults(false);
    }
  }

  const filterData = () => {
    let searchTermLowerCase = _.toLower(searchTerm);

    const results = _.filter(searchResults, obj => {
      return _(obj).some(str => {
        return _(str)
          .toLower()
          .includes(searchTermLowerCase);
      });
    });

    setSearchResults(results);

    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  const handleClickAway = () => {
    setShowSearchResults(false);
    setShowRecent(false);
  };

  const searchByText = searchTerm => {
    axios
      .get(
        `http://192.168.50.71/Traximize.Web.Service/api/Common/GetAllCustomers/?pageSize=11&currentPage=1&searchText=${searchTerm}`
      )
      .then(res => {
        const customers = res.data;
        setSearchResults(customers);
      })
      .catch(err => console.log(err));
    filterData();
  };

  // handle recent search term click
  const onRecentSearchTermClick = (searchTerm) => {
    setRecentSearchTerms([{ 'customerNameTerm': searchTerm }, ...recentSearchTerms,])
    navigate(`/customers/searchresult/${searchTerm}`);
  };

  // handle individual routing here
  const onResultItemClick = (id, value) => {
    if (value !== undefined) {
      handleClickAway()
      navigate(`/customers/customer/profile/${id}/${value}`);
      setRecentSearchTerms([{ 'customerNameTerm': searchTerm }, ...recentSearchTerms,].splice(0, 5))
    } else {
      handleClickAway()
      navigate(`/customers/searchresult/${id}`);
    }
  }

  // handle search all w/ search term routing here for tables
  const onViewAllClick = (value) => {
    if (value.length === 0) {
      return null
    }
    if (searchResults.length === 1) {
      setRecentSearchTerms([{ 'customerNameTerm': value }, ...recentSearchTerms,])
      handleClickAway()
      navigate(`/customers/customer/profile/${searchResults[0].id}/${searchResults[0].market}`)
    } else {
      setRecentSearchTerms([{ 'customerNameTerm': value }, ...recentSearchTerms,])
      handleClickAway()
      navigate(`/customers/searchresult/${value}`);
    }
  };

  function handleClick(event) {
    event.preventDefault();
    navigate(`/customers/search`);
  }

  const clearSearch = () => {
    setSearchTerm('')
    setShowRecent(false)
    setShowSearchResults(false)
  }

  const { sectionTitle } = props;
  return (
    <div className="flex-grid-thirds format-spacing-breadcrumbs">
      <div className="col-md-3">
        <Breadcrumbs aria-label="breadcrumb">
          <Link style={{ color: '#008898' }} color="inherit" href="/customers/search" onClick={handleClick}>
            Customer
          </Link>
          <Typography style={{ color: '#4A4A4A' }} color="textPrimary">Search Results</Typography>
        </Breadcrumbs>

        <h2 className="mt-0">{sectionTitle}</h2>
      </div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="col-md-9 offset-col-md-9" style={{ paddingTop: 11, textAlign: 'right' }}>
          <Search
            width={600}
            searchResults={searchResults}
            showSearchResults={showSearchResults}
            searching={searching}
            handleChange={handleChange}
            value={searchTerm}
            clearSearch={clearSearch}
            handleDropdownFocus={handleDropdownFocus}
            onRecentSearchTermClick={onRecentSearchTermClick}
            showRecent={showRecent}
            recentSearchTerms={recentSearchTerms}
            isRecentEmpty={isRecentEmpty}
            onResultItemClick={onResultItemClick}
            onViewAllClick={onViewAllClick}
          />
        </div>
      </ClickAwayListener>
    </div>
  );
};

const CustomerDetailHeader = props => {
  function handleClick(event) {
    event.preventDefault();
    navigate(`/customers/search`);
  }
  const { customer } = props;
  const startDate = customer && customer.startDate;
  const lastOrderDate = customer && customer.lastOrderDate;
  return (
    <div className="flex-grid-halfs lg-flex-grid-halfs format-spacing-breadcrumbs">
      <div className="col left-col">
        <Breadcrumbs aria-label="breadcrumb">
          <Link style={{ color: '#008898' }} color="inherit" href="/customers/search" onClick={handleClick}>
            Customer
          </Link>
          <Typography style={{ color: '#4A4A4A' }} color="textPrimary">Customer Details</Typography>
        </Breadcrumbs>
        <h2 className="mt-0 mb-0">
          {(customer && customer.storeName) || "No Data Available"}
          <span
            className={`${
              customer && customer.active
                ? "store-status-active"
                : "store-status-inactive"
              }`}
          >
            {customer && customer.active ? "ACTIVE" : "INACTIVE"}
          </span>
        </h2>
        <span className="header-copy">
          Customer ID #{(customer && customer.traximizeCustomerID) || "No Data Available"}
        </span>
      </div>
      <div className="col">
        <div className="latest-date-wrapper">
          <div className="order-date-title">Last order date</div>
          <div className="order-date-detail">
          {lastOrderDate ? <Moment format="MM/DD/YYYY">{lastOrderDate}</Moment> : 'MM/DD/YYYY' }
          </div>
        </div>
        <div className="latest-date-wrapper">
          <div className="order-date-title">Start date</div>
          <div className="order-date-detail">
          {startDate ? <Moment format="MM/DD/YYYY">{startDate}</Moment> : 'MM/DD/YYYY' }
          </div>
        </div>
      </div>
    </div>
  );
};

const InvoiceResultsHeader = (props) => {
  const totalInvoices = useSelector(state => state.setInvoiceDataLength);
  const data = useSelector(state => state.setInvoiceGenerationData);
  const noData = useSelector(state => state.setNoData);
  const [isInvoiceLoading, setIsInvoiceLoading] = useState()

  const handleInvoiceResults = () => {
    setIsInvoiceLoading(true)
    pdfApi.getPDFforAllOrders(data.market, data.orderDate, data.orderType)
      .then(res => {
        const blob = new Blob([res.data], { type: 'application/pdf' })
        const objectUrl = window.URL.createObjectURL(blob)
        setIsInvoiceLoading(false)
        window.open(objectUrl)
        // use this to download the file, instead of tab preview
        // FileDownload(blob, 'bakelist.pdf')
      })
      .catch(err => console.log("API: ", err))
  }

  function handleClick(event) {
    event.preventDefault();
    navigate(`/orders/search`);
  }
  const { sectionTitle } = props;
  return (
    <div className="flex-grid-halfs format-spacing-breadcrumbs">
      <div className="col left-col md-12">
        <Breadcrumbs aria-label="breadcrumb">
          <Link style={{ color: '#008898' }} color="inherit" href="/orders/invoices" onClick={handleClick}>
            Orders
          </Link>
          <Typography style={{ color: '#4A4A4A' }} color="textPrimary">Invoices</Typography>
        </Breadcrumbs>
        <h2 className="mt-0">{sectionTitle}</h2>
      </div>
      <div className="col md-12" style={{ textAlign: 'right', paddingTop: 16 }}>
        {!noData && (
          <Button onClick={handleInvoiceResults}>
            Preview All {totalInvoices} Invoices {isInvoiceLoading ? <span style={{ position: 'relative', top: 2, left: 10 }}><ClipLoader size={20} color={'#ffffff'} /></span> : null}
          </Button>
        )}
      </div>
    </div>
  );
};
function Header(props) {
  const showHeaderSearch = useSelector(state => state.showHeaderSearch);
  const showOrdersHeader = useSelector(state => state.showOrdersHeader);

  const showHeaderSearchResults = useSelector(
    state => state.showHeaderSearchResults
  );
  const showHeaderCustomerDetails = useSelector(
    state => state.showHeaderCustomerDetails
  );

  const showInvoicesResults = useSelector(
    state => state.showInvoicesResults
  );

  const customerContactInfo = useSelector(state => state.customerContactInfo);

  const { buttonTitle, sectionTitle } = props;
  return (
    <div className="">
      {showHeaderSearch && (
        <Searcheader buttonTitle={buttonTitle} sectionTitle={sectionTitle} />
      )}
      {showHeaderSearchResults && (
        <SearchResultsHeader
          buttonTitle={buttonTitle}
          sectionTitle={sectionTitle}
        />
      )}
      {showHeaderCustomerDetails && (
        <CustomerDetailHeader
          buttonTitle={buttonTitle}
          sectionTitle={sectionTitle}
          customer={customerContactInfo}
        />
      )}
      {showOrdersHeader && (
        <OrdersHeader buttonTitle={buttonTitle} sectionTitle={sectionTitle} />
      )}
      {showInvoicesResults && (
        <InvoiceResultsHeader
          buttonTitle={buttonTitle}
          sectionTitle={sectionTitle}
        />
      )}
    </div>
  );
}

Header.propTypes = {
  buttonTitle: PropTypes.any,
  sectionTitle: PropTypes.any
};

export default Header;
