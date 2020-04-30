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

export function showHeaderSearch(payload) {
  return { type: SHOW_HEADER_SEARCH, payload };
}

export function showOrdersHeader(payload) {
  return { type: SHOW_ORDERS_HEADER, payload };
}

export function showHeaderSearchResults(payload) {
  return { type: SHOW_HEADER_SEARCH_RESULTS, payload };
}

export function showHeaderCustomerDetails(payload) {
  return { type: SHOW_HEADER_CUSTOMER_DETAILS, payload };
}

export function showInvoicesResults(payload) {
  return { type: SHOW_INVOICE_RESULTS, payload };
}

export function setCustomerContactInfo(payload) {
  return { type: CUSTOMER_CONTACT_INFO, payload };
}

export function setInvoiceGenerationData(payload) {
  return { type: SET_INVOICE_GENERATION_DATA, payload }
}

export function setInvoiceDataLength(payload) {
  return { type: SET_INVOICE_DATA_LENGTH, payload }
}

export function setSearchTerm(payload) {
  return { type: SET_SEARCH_TERM, payload }
}

export function setNoData(payload) {
  return { type: SET_NO_DATA, payload }
}

export function setSideNavToggle(payload) {
  return { type: SET_SIDENAV_TOGGLE, payload }
}