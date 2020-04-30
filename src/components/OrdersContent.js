import React, { useCallback, useEffect, useState } from "react";
import { Link } from "@reach/router";
import ordersApi from "api/orders";
import pdfApi from "api/pdf";
import { Button, Paper, Icon, Select, FormControl, MenuItem } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { store } from "../js/store/index";
import {
  showHeaderSearch,
  showHeaderSearchResults,
  showHeaderCustomerDetails,
  showInvoicesResults,
  showOrdersHeader,
  setInvoiceDataLength
} from "../js/actions/index";
import { formatMarketData, formatOrderTypeData } from "../utils/";
import moment from "moment";
import { ClipLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
// import FileDownload from 'js-file-download'

const useStyles = makeStyles(theme => ({
  orderBox: {
    display: 'inline-block',
    height: 237,
    margin: "auto",
    padding: 30,
    textAlign: 'left',
    width: 760,
  },
  mtSpacer24: {
    marginTop: 24
  },
  mtSpacer12: {
    marginTop: 12
  },
  formControl: {
    maxWidth: 240,
    minWidth: 240,
    width: "100%",
    paddingRight: 20,
    cursor: 'pointer'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  dateInput: {
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    height: 42,
    width: '100%',
    '& .MuiOutlinedInput-inputAdornedStart': {
      position: 'relative',
      left: '-10px',
      top: '0px'
    }
  },
  listItem: {
    maxWidth: 224,
    minWidth: 224
  }
}));

const CaretDownIcon = () => {
  return (
    <Icon
      className="fas fa-chevron-down"
      style={{
        fontSize: ".75rem",
        color: '#008898',
        position: 'absolute',
        right: 8,
        pointerEvents: 'none',
      }}
    />
  )
}


function OrdersContent() {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const month = moment(selectedDate).format('MM')
  const day = moment(selectedDate).format('DD')
  const year = moment(selectedDate).format('YYYY')
  const [marketData, setMarketData] = useState();
  const [orderTypeList, setOrderTypeList] = useState();
  const [page, setPage] = useState();
  const [marketValue, setMarketValue] = useState()
  const [orderType, setOrderType] = useState()
  const [isBakeListLoading, setIsBakeListLoading] = useState()
  const [isInvoiceLoading, setIsInvoiceLoading] = useState()
  const [isError, setIsError] = useState()

  const handleInvoiceResults = () => {
    setIsInvoiceLoading(true)
    pdfApi.getPDFforAllOrders(marketValue, `${month}/${day}/${year}`, `${orderType[0].id}`)
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

  useEffect(() => {
    setPage(window.location.pathname);
    if (page) {
      store.dispatch(showHeaderSearch(false));
      store.dispatch(showHeaderSearchResults(false));
      store.dispatch(showHeaderCustomerDetails(false));
      store.dispatch(showInvoicesResults(false));
      store.dispatch(showOrdersHeader(true));
      store.dispatch(setInvoiceDataLength(null))
    }
  }, [page]);

  const fetchMarket = useCallback(() => {
    ordersApi
      .getOrderTypesForMarkets()
      .then(res => {
        const markets = res.data;
        setMarketData(formatMarketData(markets));
      })
      .catch(err => {
        console.log("API: ", err)
        setIsError(true)
      });
  }, []);

  const handleOrderSelection = (e) => {
    const dataForSelectedMarket = marketData.filter(i => i.market === marketValue)
    const orderTypeArr = formatOrderTypeData(dataForSelectedMarket[0].orderType).filter(i => i.orderType === e.target.value)
    setOrderType(orderTypeArr)
  }

  const updateSelectedMarketOrderData = useCallback(() => {
    const dataForSelectedMarket = marketData.filter(i => i.market === marketValue)
    const orderTypeArr = dataForSelectedMarket[0].orderType;
    setOrderType(formatOrderTypeData(orderTypeArr))
    setOrderTypeList(formatOrderTypeData(orderTypeArr));
  }, [marketValue, marketData])

  const handleBakeList = () => {
    setIsBakeListLoading(true)
    ordersApi
      .viewBakeList(marketValue, `${month}/${day}/${year}`)
      .then(res => {
        const blob = new Blob([res.data], { type: 'application/pdf' })
        const objectUrl = window.URL.createObjectURL(blob)
        setIsBakeListLoading(false)
        window.open(objectUrl)
        // use this to download the file, instead of tab preview
        // FileDownload(blob, 'bakelist.pdf')
      })
      .catch(err => console.log("API: ", err))
  }

  useEffect(() => {
    fetchMarket();
  }, [fetchMarket]);

  useEffect(() => {
    if (marketData) {
      setMarketValue(marketData[0].market)
      const orderTypeArr = marketData[0].orderType;
      setOrderType(formatOrderTypeData(orderTypeArr))
      setOrderTypeList(formatOrderTypeData(orderTypeArr));
    }
  }, [marketData]);

  useEffect(() => {
    if (marketValue) {
      updateSelectedMarketOrderData()
    }
  }, [marketValue, updateSelectedMarketOrderData])


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Paper className={classes.orderBox}>
            <h3 className="order-headers no-margin-top">
              Preview and Print
              {(orderType) && (<Link className="order-link" to={`/orders/invoices/${marketValue}/${orderType[0].id}/${month}/${day}/${year}`}>View Invoice List</Link>)}
              {(!orderType || isError) && (<span className="order-link-disabled">View Invoice List</span>)}
              {/* {isError && (<span className="order-link-disabled">View Invoice List</span>)} */}
            </h3>
            <div className="row">
              <div className="col-md-4">
                <label
                  className={`order-label ${classes.mtSpacer12}`}
                  htmlFor="supplyType"
                >
                  Market
                </label>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                >
                  <Select
                    MenuProps={{ getContentAnchorEl: null, anchorOrigin: { vertical: "bottom", horizontal: -12, } }}
                    IconComponent={CaretDownIcon}
                    labelId="orderType-label"
                    id="market"
                    value={marketValue ? marketValue : ''}
                    onChange={(e) => setMarketValue(e.target.value)}
                  >
                    {marketData &&
                      marketData.map((value, i) => (
                        <MenuItem className={classes.listItem} key={i} value={value.market}>
                          {value.market}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4">
                <label
                  className={`order-label ${classes.mtSpacer12}`}
                  htmlFor="supplyType"
                >
                  Order Type
                </label>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                >
                  <Select
                    MenuProps={{ getContentAnchorEl: null, anchorOrigin: { vertical: "bottom", horizontal: -12, } }}
                    IconComponent={CaretDownIcon}
                    labelId="orderType-label"
                    id="orderType"
                    value={orderType ? orderType[0].orderType : ""}
                    onChange={(e) => handleOrderSelection(e)}
                  >
                    {orderTypeList && orderTypeList.map((value, i) => (
                      <MenuItem className={classes.listItem} key={i} value={value.orderType}>
                        {value.orderType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4">
                <label
                  className={`order-label ${classes.mtSpacer12}`}
                  htmlFor="supplyType"
                >
                  Order Date
                </label>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    className={classes.dateInput}
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    format="MM/DD/YYYY"
                    value={selectedDate}
                    keyboardIcon={<FontAwesomeIcon icon={faCalendar} style={{ color: '#008898', fontSize: 18 }} />}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={date => handleDateChange(date)}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Button
                  disabled={isError}
                  className={classes.mtSpacer24}
                  style={{ width: "100%" }}
                  onClick={handleBakeList}
                >
                  Preview Bake List {isBakeListLoading ? <span style={{ position: 'relative', top: 2, left: 10 }}><ClipLoader size={20} color={'#ffffff'} /></span> : null}
                </Button>
              </div>
              <div className="col-md-6">
                <Button
                  disabled={isError}
                  className={classes.mtSpacer24}
                  style={{ width: "100%" }}
                  onClick={handleInvoiceResults}
                >
                  Preview Invoices {isInvoiceLoading ? <span style={{ position: 'relative', top: 2, left: 10 }}><ClipLoader size={20} color={'#ffffff'} /></span> : null}
                </Button>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default OrdersContent;
