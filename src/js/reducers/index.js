import {
  CUSTOMER_CONTACT_INFO,
  SHOW_HEADER_SEARCH,
  SHOW_ORDERS_HEADER,
  SHOW_HEADER_SEARCH_RESULTS,
  SHOW_HEADER_CUSTOMER_DETAILS,
  SHOW_INVOICE_RESULTS,
  SET_INVOICE_GENERATION_DATA,
  SET_INVOICE_DATA_LENGTH,
  SET_SEARCH_TERM,
  SET_NO_DATA,
  SET_SIDENAV_TOGGLE
} from "../constants/action-types";

const initialState = {
  showHeaderSearch: false,
  showHeaderSearchResults: false,
  showHeaderCustomerDetails: false,
  showInvoicesResults: false,
  showOrdersHeader: false,
  customerContactInfo: {},
  setInvoiceGenerationData: {},
  setInvoiceDataLength: null,
  setSearchTerm: null,
  setNoData: null,
  setSideNavToggle: false
};

function rootReducer(state = initialState, action) {
  if (action.type === SHOW_HEADER_SEARCH) {
    return Object.assign({}, state, {
      showHeaderSearch: action.payload
    });
  }
  if (action.type === SHOW_ORDERS_HEADER) {
    return Object.assign({}, state, {
      showOrdersHeader: action.payload
    });
  }

  if (action.type === SHOW_HEADER_SEARCH_RESULTS) {
    return Object.assign({}, state, {
      showHeaderSearchResults: action.payload
    });
  }

  if (action.type === SHOW_HEADER_CUSTOMER_DETAILS) {
    return Object.assign({}, state, {
      showHeaderCustomerDetails: action.payload
    });
  }
  if (action.type === SHOW_INVOICE_RESULTS) {
    return Object.assign({}, state, {
      showInvoicesResults: action.payload
    });
  }

  if (action.type === CUSTOMER_CONTACT_INFO) {
    return Object.assign({}, state, {
      customerContactInfo: action.payload
    });
  }
  if (action.type === SET_INVOICE_GENERATION_DATA) {
    return Object.assign({}, state, {
      setInvoiceGenerationData: action.payload
    });
  }
  if (action.type === SET_INVOICE_DATA_LENGTH) {
    return Object.assign({}, state, {
      setInvoiceDataLength: action.payload
    });
  }
  if (action.type === SET_SEARCH_TERM) {
    return Object.assign({}, state, {
      setSearchTerm: action.payload
    });
  }
  if (action.type === SET_NO_DATA) {
    return Object.assign({}, state, {
      setNoData: action.payload
    });
  }
  if (action.type === SET_SIDENAV_TOGGLE) {
    return Object.assign({}, state, {
      setSideNavToggle: action.payload
    });
  }

  return state;
}

export default rootReducer;
