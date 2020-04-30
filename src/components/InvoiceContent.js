import React, { useEffect, useState } from "react";
import { store } from "../js/store/index";
import {
  showHeaderSearch,
  showHeaderSearchResults,
  showHeaderCustomerDetails
} from "../js/actions/index";

export default function InvoiceContent() {
  const [page, setPage] = useState();

  useEffect(() => {
    setPage(window.location.pathname);
    if (page) {
      store.dispatch(showHeaderSearch(false));
      store.dispatch(showHeaderSearchResults(true));
      store.dispatch(showHeaderCustomerDetails(false));
    }
  }, [page]);

  return (
    <div className="container">
      <div className="row"></div>
    </div>
  );
}
