import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { navigate, useParams } from "@reach/router";
import ordersApi from "api/orders";
import { Icon, Select, FormControl, MenuItem, Checkbox, ListItemText } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { formatMarketData, formatOrderTypeData } from "../utils/";
import moment from "moment";
import useDimensions from "react-use-dimensions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

function InvoiceTableFilters({ setValues }) {
  InvoiceTableFilters.propTypes = {
    setValues: PropTypes.func
  }
  const params = useParams();
  const marketParam = params.market;
  const orderTypeParam = params.orderType;
  const monthParam = params.month;
  const dayParam = params.day;
  const yearParam = params.year;
  const [selectedDate, handleDateChange] = useState(`${monthParam}/${dayParam}/${yearParam}`);
  const month = moment(selectedDate).format('MM')
  const day = moment(selectedDate).format('DD')
  const year = moment(selectedDate).format('YYYY')
  const [marketData, setMarketData] = useState();
  const [orderTypeList, setOrderTypeList] = useState();
  const [orderType, setOrderType] = useState()
  const [marketValue, setMarketValue] = useState()
  const [routes, setRoutes] = useState()
  const [routeSelection, setRouteSelection] = useState([]);
  const [selectRef, { width }] = useDimensions();

  const useStyles = makeStyles(theme => ({
    mtSpacer24: {
      marginTop: 24
    },
    mtSpacer12: {
      marginTop: 12
    },
    formControl: {
      maxWidth: 240,
      width: "100%",
      display: 'flex',
      fullWidth: true,
      cursor: 'pointer'
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    listItem: {
      width: `${width + 3}px`,
    },
    dateInput: {
      maxWidth: 240,
      width: "100%",
      backgroundColor: "#ffffff",
      boxSizing: "border-box",
      '& .MuiOutlinedInput-inputAdornedStart': {
        position: 'relative',
        left: '-10px',
        top: '0px'
      }
    }
  }));

  const classes = useStyles();

  const fetchMarket = useCallback(() => {
    ordersApi
      .getOrderTypesForMarkets()
      .then(res => {
        const markets = res.data;
        setMarketData(formatMarketData(markets));
      })
      .catch(err => console.log("API: ", err));
  }, []);

  const fetchRoutes = useCallback(() => {
    ordersApi
      .getRoutesForOrderDates(orderTypeParam, `${month}/${day}/${year}`, marketParam)
      .then(res => {
        const routes = res.data;
        setRoutes(routes)
      })
      .catch(err => console.log(err));
  }, [orderTypeParam, month, day, year, marketParam]);


  const handleOrderSelection = (e) => {
    const dataForSelectedMarket = marketData.filter(i => i.market === marketParam)
    const orderTypeArr = formatOrderTypeData(dataForSelectedMarket[0].orderType).filter(i => i.orderType === e.target.value)
    navigate(
      `/orders/invoices/${marketParam}/${orderTypeArr[0].id}/${monthParam}/${dayParam}/${yearParam}`
    );
  }

  const updateSelectedMarketOrderData = useCallback(() => {
    navigate(
      `/orders/invoices/${marketValue}/${orderTypeParam}/${monthParam}/${dayParam}/${yearParam}`
    );
  }, [marketValue, orderTypeParam, monthParam, dayParam, yearParam])

  useEffect(() => {
    fetchMarket();
  }, [fetchMarket]);

  useEffect(() => {
    if (marketData) {
      fetchRoutes()
      const filteredMarketData = marketData.filter(i => i.market === marketParam)
      const orderTypeArr = filteredMarketData[0].orderType;
      const orderTypeByParam = formatOrderTypeData(orderTypeArr).filter(i => i.id === orderTypeParam)
      setOrderTypeList(formatOrderTypeData(orderTypeArr));
      setOrderType(orderTypeByParam)
    }
  }, [marketData, marketParam, orderTypeParam, fetchRoutes]);

  useEffect(() => {
    if (marketValue) {
      updateSelectedMarketOrderData()
    }
  }, [marketValue, updateSelectedMarketOrderData])

  useEffect(() => {
    navigate(
      `/orders/invoices/${marketParam}/${orderTypeParam}/${month}/${day}/${year}`
    );
  }, [marketParam, orderTypeParam, month, day, year])

  const handleChange = (event) => {
    setRouteSelection(event.target.value);
    setValues(event.target.value)
  };

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

  return (
    <div className="container" style={{ marginTop: '-43px', marginRight: 0 }}>
      <div className="row">
        <div className="col">
          <div className="row justify-content-end">
            <div className="col-md-3 invoices">
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
                  ref={selectRef}
                  MenuProps={{ getContentAnchorEl: null, anchorOrigin: { vertical: "bottom", horizontal: -12, } }}
                  IconComponent={CaretDownIcon}
                  labelId="orderType-label"
                  id="market"
                  value={marketParam}
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
            <div className="col-md-3 invoices">
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
            <div className="col-md-3 invoices">
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
            <div className="col-md-3 invoices">
              <label
                className={`order-label ${classes.mtSpacer12}`}
                htmlFor="supplyType"
              >
                Route(s)
                </label>
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <Select
                  MenuProps={{ getContentAnchorEl: null, anchorOrigin: { vertical: "bottom", horizontal: -12, } }}
                  IconComponent={CaretDownIcon}
                  multiple
                  displayEmpty
                  value={routeSelection}
                  onChange={handleChange}
                  labelId="orderType-label"
                  id="orderType"
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <span>All Routes</span>;
                    }

                    return selected.join(', ');
                  }}
                >
                  {routes && routes.map((name) => (
                    <MenuItem className={classes.listItem} key={name} value={name}>
                      <Checkbox color="primary" checked={routeSelection.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceTableFilters;
