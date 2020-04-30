/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "@reach/router";
import { store } from "../js/store/index";
import ordersApi from "api/orders";
import pdfApi from "api/pdf";
import {
  showHeaderSearch,
  showOrdersHeader,
  showHeaderSearchResults,
  showHeaderCustomerDetails,
  showInvoicesResults,
  setInvoiceGenerationData,
  setInvoiceDataLength,
  setNoData
} from "../js/actions/index";
import { Icon, ClickAwayListener } from "@material-ui/core/";
import { TableLayout } from "@tallwave/dp-ui";
import { formatInvoicesTableData, base64ToArrayBuffer } from "../utils/";
import InvoiceTableFilters from "components/InvoiceTableFilters"
import { ClipLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-regular-svg-icons'
import ErrorAlert from 'components/ErrorAlert'

function InvoicesResult() {
  const params = useParams();
  const searchTerm = null
  const market = params.market;
  const orderType = params.orderType;
  const orderDate = `${params.month}/${params.day}/${params.year}`
  const [isLoading, setIsLoading] = useState()
  const [tableData, setTableData] = useState([{}]);
  const [noData, setIsNoData] = useState()
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [value, setValues] = useState()
  const [isError, setIsError] = useState()

  useEffect(() => {
    store.dispatch(showHeaderSearchResults(false));
    store.dispatch(showHeaderSearch(false));
    store.dispatch(showOrdersHeader(false));
    store.dispatch(showHeaderCustomerDetails(false));
    store.dispatch(showInvoicesResults(true));
    store.dispatch(setInvoiceGenerationData(
      {
        market, orderType, orderDate
      }
    ));
  });

  // Set view row logic here
  const handleRowRouting = () => {
    return null
  };
  // Set view order logic here, PHASE @
  // const handleOrderDetails = row => {
  //   console.log(row)
  // };

  // Preview invoice
  const handleSingleInvoice = (orderNumber, row) => {
    pdfApi.getPDFforSingleOrder(market, orderDate, orderNumber)
      .then(res => {
        const pdfData = base64ToArrayBuffer(res.data);
        const file = new Blob([pdfData], { type: 'application/pdf' });
        const fileUrl = window.URL.createObjectURL(file);
        window.open(fileUrl);
        row.toggleRowExpanded(false)
      }).catch(err => console.log("API: ", err))
  }

  const searchResultsTableHeader = () => {
    return (
      <div>
        <FontAwesomeIcon icon={faFileAlt} style={{ color: '#ca8500', marginRight: "6px", }} />
        <span style={{ fontSize: "15px", fontFamily: "Montserrat, sans-serif", fontWeight: 'bold' }}>
          INVOICE LIST
        </span>
      </div>
    );
  };

  const customerListColumns = [
    {
      Header: () => searchResultsTableHeader(),
      id: "columnHeader",
      columns: [
        {
          Header: "Order #",
          accessor: "orderNumber",
          Cell: ({ cell: { value } }) => (
            <span style={{ color: "#008898" }}>{value}</span>
          )
        },
        {
          Header: "Delivery Date",
          accessor: "orderDate",
          Cell: ({ cell: { value } }) => (
            <span>{value}</span>
          )
        },
        {
          Header: "Store Name",
          accessor: "customerName",
          Cell: ({ cell: { value } }) => (
            <span>{value}</span>
          )
        },
        {
          Header: "Invoice",
          accessor: "invoiceTotal",
          Cell: ({ cell: { value } }) => (
            <span>{value}</span>
          )
        },
        {
          Header: "Route",
          accessor: "routeName",
          Cell: ({ cell: { value } }) => (
            <span>{value}</span>
          )
        },
        {
          Header: "Status",
          accessor: "status",
          Cell: ({ cell: { value } }) => (
            <span>{value}</span>
          )
        },
        {
          Header: () => null,
          id: 'expander',
          // eslint-disable-next-line react/display-name
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()}>
              {!noData && (
                <Icon className="fas fa-ellipsis-v" id="table-actions" />
              )}
            </div>
          ),
          className: 'actions'
        }
      ]
    }
  ];

  const renderActionSheet =
    ({ row }) => (
      <ClickAwayListener onClickAway={() => handleActionSheetClickAway(row)}>
        <div className='dropdownTableActionInvoice'>
          <div className='dropdownTableAction-content-invoice-table'>
            {/* <div onClick={() => handleOrderDetails(row.values.orderNumber)} onKeyDown={() => handleOrderDetails(row.values.orderNumber)} role="button" tabIndex="6">View Order Details</div> */}
            <div className="dropdownTableAction-preview-invoice" onClick={() => handleSingleInvoice(row.values.orderNumber, row)} onKeyDown={() => null} role="button" tabIndex="7">Preview Invoice</div>
            {/* <div onClick={() => handleMailTo(row.values.id)} onKeyDown={() => handleMailTo(row.values.id)} role="button" tabIndex="7">Email Invoice</div> */}
          </div>
        </div>
      </ClickAwayListener>
    )

  const fetchOrders = useCallback(() => {
    ordersApi
      .getOrdersForOrderType(orderType, orderDate, market)
      .then(res => {
        const orders = res.data;
        if (orders.length === 0) {
          setIsNoData(true)
          store.dispatch(setNoData(true));
        } else {
          setTableData(formatInvoicesTableData(orders))
          setIsNoData(false)
          store.dispatch(setNoData(false));
          store.dispatch(setInvoiceDataLength(orders.length))
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.log("API: ", err)
        setIsLoading(false)
        setIsError(true)
      });
  }, [orderType, orderDate, market]);

  useEffect(() => {
    setIsLoading(true)
    fetchOrders();
  }, [fetchOrders]);

  const filterTableData = useCallback((value) => {
    if (value !== undefined) {
      const filteredArr = tableData.filter(i => value.indexOf(i.routeName) >= 0)
      setFilteredTableData(filteredArr)
      store.dispatch(setInvoiceDataLength(filteredArr.length >= 1 ? filteredArr.length : tableData.length))
    }
  }, [tableData])

  useEffect(() => {
    filterTableData(value)
  }, [value, filterTableData])

  const handleActionSheetClickAway = (row) => {
    row.toggleRowExpanded(false)
  };

  return (
    <div>
      <div className="customer-wrapper">
        {isError && <ErrorAlert />}
        {!isError && (
          <div className="content-body">
            {!isLoading && (
              <TableLayout
                // TODO: create shadowbox columns design for loading 
                columns={customerListColumns}
                noData={noData}
                data={filteredTableData.length === 0 ? tableData : filteredTableData}
                searchTerm={searchTerm}
                handleRowRouting={handleRowRouting}
                renderActionSheet={!noData ? renderActionSheet : null}
                invoiceSelects={<InvoiceTableFilters setValues={setValues} />}
              />
            )}
            {isLoading && (<ClipLoader size={25} color={'#9B9B9B'} />)}
            <br />
          </div>
        )}
      </div>
    </div>
  );
}

export default InvoicesResult;
