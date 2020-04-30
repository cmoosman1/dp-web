import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { ClickAwayListener, Paper } from "@material-ui/core/";
import { Search } from "@tallwave/dp-ui";
import { store } from "../js/store/index";
import {
  showHeaderSearch,
  showHeaderSearchResults,
  showHeaderCustomerDetails,
  showInvoicesResults,
  showOrdersHeader
} from "../js/actions/index";
import axios from "axios";
import _ from "lodash";

export default function SearchContent() {
  const [isRecentEmpty, setIsRecentEmpty] = useState(null);
  const [showRecent, setShowRecent] = useState(false);
  const [searching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearchTerms, setRecentSearchTerms] = useState([]);

  const [page, setPage] = useState();

  useEffect(() => {
    setPage(window.location.pathname);
    if (page) {
      store.dispatch(showHeaderSearch(true));
      store.dispatch(showHeaderSearchResults(false));
      store.dispatch(showHeaderCustomerDetails(false));
      store.dispatch(showInvoicesResults(false));
      store.dispatch(showOrdersHeader(false));
    }
  }, [page]);

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
    if (localStorage.getItem("recentSearchTerms")) {
      setRecentSearchTerms(
        JSON.parse(localStorage.getItem("recentSearchTerms"))
      );
    } else {
      localStorage.setItem(
        "recentSearchTerms",
        JSON.stringify(recentSearchTerms)
      );
      isEmpty(recentSearchTerms);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "recentSearchTerms",
      JSON.stringify(recentSearchTerms)
    );
    isEmpty(recentSearchTerms);
  }, [recentSearchTerms]);

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

  const clearSearch = () => {
    setSearchTerm('')
    setShowRecent(false)
    setShowSearchResults(false)
  }


  const searchByText = searchTerm => {
    axios
      .get(
        `http://192.168.50.71/Traximize.Web.Service/api/Common/GetAllCustomers/?pageSize=11&currentPage=1&searchText=${searchTerm}`
      )
      .then(res => {
        const customers = res.data;
        setSearchResults(customers);
        console.log("customers", customers);
      })
      .catch(err => console.log(err));
    filterData();
  };

  // handle recent search term click
  const onRecentSearchTermClick = searchTerm => {
    setRecentSearchTerms([
      { customerNameTerm: searchTerm },
      ...recentSearchTerms
    ]);
    navigate(`/customers/searchresult/${searchTerm}`);
  };

  const onResultItemClick = (id, value) => {
    if (value !== undefined) {
      navigate(`/customers/customer/profile/${id}/${value}`);
      setRecentSearchTerms(
        [{ customerNameTerm: searchTerm }, ...recentSearchTerms].splice(0, 5)
      );
    } else {
      navigate(`/customers/searchresult/${id}`);
    }
  };

  // handle search all w/ search term routing here for tables
  const onViewAllClick = value => {
    if (value.length === 0) {
      return null;
    }
    if (searchResults.length === 1) {
      setRecentSearchTerms([{ customerNameTerm: value }, ...recentSearchTerms]);
      navigate(
        `/customers/customer/profile/${searchResults[0].id}/${searchResults[0].market}`
      );
    } else {
      setRecentSearchTerms([{ customerNameTerm: value }, ...recentSearchTerms]);
      navigate(`/customers/searchresult/${value}`);
    }
  };

  return (
    <Paper className="search-box" style={{ maxHeight: "201px", minHeight: "201px" }}>
      <h3 className="customers-header no-margin-top">Search Customer record</h3>
      <span className="alert-copy" style={{ marginBottom: "20px" }}>
        Search by Customer Name, Customer ID, Customer Group, Store, Route,
        Phone Number, Address, Zip Code, Email or Crossroads.
      </span>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="mt-20">
          <Search
            width={770}
            searchResults={searchResults}
            showSearchResults={showSearchResults}
            searching={searching}
            handleChange={handleChange}
            clearSearch={clearSearch}
            value={searchTerm}
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
    </Paper>
  );
}
