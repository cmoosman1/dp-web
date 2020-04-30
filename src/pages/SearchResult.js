/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, navigate } from "@reach/router";
import renderHTML from "react-render-html";
import { store } from "../js/store/index";
import customersApi from "api/customers";
import {
  showHeaderSearch,
  showHeaderSearchResults,
  showHeaderCustomerDetails,
  setSearchTerm,
} from "../js/actions/index";
import { TableLayout } from "@tallwave/dp-ui";
import { boldString, formatCustomersTableData } from "../utils/";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/pro-regular-svg-icons'
import ErrorAlert from 'components/ErrorAlert'
import { ClipLoader } from 'react-spinners'

function SearchResult() {
  const params = useParams();
  const searchTerm = params.searchId;
  const [isLoading, setIsLoading] = useState()
  const [isError, setIsError] = useState()
  const [noData, setIsNoData] = useState()
  const [tableData, setTableData] = useState([{}]);

  useEffect(() => {
    store.dispatch(showHeaderSearchResults(true));
    store.dispatch(showHeaderSearch(false));
    store.dispatch(showHeaderCustomerDetails(false));
    store.dispatch(setSearchTerm(searchTerm));
  });

  const handleRowRouting = row => {
    navigate(
      `/customers/customer/profile/${row.original.id}/${row.original.market}`
    );
  };

  const searchResultsTableHeader = () => {
    return (
      <div>
        <FontAwesomeIcon icon={faUserFriends} style={{ color: '#ca8500', marginRight: "6px", }} />
        <span style={{ fontSize: "15px", fontFamily: "Montserrat, sans-serif", fontWeight: 'bold' }}>
          CUSTOMER LIST
        </span>
      </div>
    );
  };

  const boldQueryValue = value =>
    value !== null ? boldString(value, searchTerm) : "";

  const customerListColumns = [
    {
      Header: () => searchResultsTableHeader(),
      id: "columnHeader",
      columns: [
        {
          Header: "Customer ID #",
          accessor: "id",
          Cell: ({ cell: { value, row } }) => (
            <Link
              to={`/customers/customer/profile/${row.original.id}/${row.original.market}`}
            >
              <span style={{ color: "#008898" }}>
                {value && renderHTML(boldQueryValue(value))}
              </span>
            </Link>
          )
        },
        {
          Header: "Store Name",
          accessor: "name",
          Cell: ({ cell: { value } }) => (
            <span>{value && renderHTML(boldQueryValue(value))}</span>
          )
        },
        {
          Header: "Address",
          accessor: "addressLine2",
          Cell: ({ cell: { value } }) => (
            <span>{value && renderHTML(boldQueryValue(value))}</span>
          )
        },
        {
          Header: "Phone",
          accessor: "phoneNumber",
          Cell: ({ cell: { value } }) => (
            <span>{value && renderHTML(boldQueryValue(value))}</span>
          )
        },
        {
          Header: "Email",
          accessor: "email",
          Cell: ({ cell: { value } }) => (
            <span>{value && renderHTML(boldQueryValue(value))}</span>
          )
        }
      ]
    }
  ];

  const fetchCustomer = useCallback(() => {
    setIsLoading(true)
    customersApi
      .getCustomerBySearchTerm(searchTerm)
      .then(res => {
        const customers = res.data;
        if (customers.length === 0) {
          setIsNoData(true)
        } else {
          setTableData(formatCustomersTableData(customers));
          setIsNoData(false)
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.log("API: ", err)
        setIsError(true)
        setIsLoading(false)
      });
  }, [searchTerm]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  return (
    <div className="customer-wrapper">
      {isError && <ErrorAlert />}
      {!isError && (
        <div className="content-body">
          {!isLoading && (
            <TableLayout
              columns={customerListColumns}
              data={tableData}
              searchTerm={searchTerm}
              handleRowRouting={handleRowRouting}
              noData={noData}
            />
          )}
          {isLoading && (<ClipLoader size={25} color={'#9B9B9B'} />)}
          <br />
        </div>
      )}
    </div>
  );
}

export default SearchResult;
