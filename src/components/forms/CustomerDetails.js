/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, FormControl, MenuItem } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import customersApi from "api/customers";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Icon from "@material-ui/core/Icon";
import "../forms/FormsLayout.css";
import useDimensions from "react-use-dimensions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { useParams } from "@reach/router";

const CustomerDetails = props => {
  const [detail, setDetail] = useState({});
  const [customerPriceGroup, setCustomerPriceGroup] = useState([{}]);
  const [retailPriceGroup, setRetailPriceGroup] = useState([{}]);
  const [selectRef, { width }] = useDimensions();

  const params = useParams();
  const customerMarket = params.marketId;

  const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: 120,
      width: "100%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    listItem: {
      width: `${width + 3}px`,
    },
  }));
  const classes = useStyles();

  const fetchCustomer = useCallback(() => {
    customersApi
      .getCustomerPriceGroupsByMarket(customerMarket)
      .then(res => {
        const customerPriceGroupData = res.data;
        setCustomerPriceGroup(customerPriceGroupData);
      })
      .catch(err => console.log(err));
    customersApi
      .getCustomerRetailPriceGroupsByMarket(customerMarket)
      .then(res => {
        const retailPriceGroupData = res.data;
        retailPriceGroupData.push("No Data Available");
        setRetailPriceGroup(retailPriceGroupData);
      })
      .catch(err => console.log(err));
  }, [customerMarket]);

  useEffect(() => {
    setDetail(props.fields);
    fetchCustomer();
  }, [props.fields, fetchCustomer]);

  const { control, register } = useForm({
    defaultValues: {
      traxamixeId:
        (detail && detail.traximizeCustomerID) || "No Data Available",
      storeStatus: (detail && detail.active) || "No Data Available",
      customerPriceGroup:
        (detail && detail.retailPriceGroup) || "No Data Available",
      retailPriceGroup: (detail && detail.priceGroup) || "No Data Available",
      storeName: (detail && detail.storeName) || "No Data Available",
      closingTime: (detail && detail.closingTime) || "No Data Available"
    }
  });

  let statusEffective = detail && detail.startDate;
  if (statusEffective) {
    statusEffective = statusEffective.toString().slice(0, 10);
  }

  const storeOptions = ["Active", "Inactive"];
  const customerPriceGroupOptions = customerPriceGroup;
  const retailPriceGroupOptions = retailPriceGroup;

  const handleDateChange = date => {
    console.log(date);
  };
  return (
    <div className="constainer form-wrapper">
      <div className="row row-wrapper">
        <div className="col-md-6">
          <label htmlFor="traximizeID">Traximize ID#</label>
          <input
            type="text"
            placeholder="No Data Available"
            name="traximizeID"
            ref={register}
            value={detail && detail.traximizeCustomerID}
            disabled
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="storeStatus">Store Status</label>
          {detail && (
            <Controller
              as={
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    ref={selectRef}
                    MenuProps={{ getContentAnchorEl: null, anchorOrigin: { vertical: "bottom", horizontal: -12, } }}
                    disabled
                    IconComponent={() => (
                      <Icon
                        className="fas fa-chevron-down"
                        style={{
                          fontSize: ".75rem",
                          paddingRight: "20px"
                        }}
                      />
                    )}
                    labelId="storeStatus-label"
                    id="storeStatus"
                    value={
                      (detail && detail.active) ? "Active" : "Inactive"
                    }
                  >
                    {storeOptions.map((value, i) => (
                      <MenuItem className={classes.listItem} key={i} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
              control={control}
              name="select"
            />
          )}
        </div>
        <div className="col-md-3">
          <label htmlFor="Status Effective">Status Effective</label>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              className="sm-date-input"
              autoOk
              variant="inline"
              inputVariant="outlined"
              format="MM/DD/YY"
              value={statusEffective}
              keyboardIcon={<FontAwesomeIcon icon={faCalendar} style={{ color: '#008898', fontSize: 19 }} />}
              InputAdornmentProps={{ position: "start" }}
              onChange={date => handleDateChange(date)}
              disabled
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          {/* <img
            src={customerLogo}
            alt="Customer Logo"
            className="customer-logo"
          /> */}
          <label htmlFor="customerPriceGroup">Customer Price Group</label>
          {detail && (
            <Controller
              as={
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    MenuProps={{ getContentAnchorEl: null, anchorOrigin: { vertical: "bottom", horizontal: -12, } }}
                    disabled
                    IconComponent={() => (
                      <Icon
                        className="fas fa-chevron-down"
                        style={{
                          fontSize: ".75rem",
                          paddingRight: "20px"
                        }}
                      />
                    )}
                    labelId="customerPriceGroup-label"
                    id="customerPriceGroup"
                    value={
                      !!(detail.priceGroup)
                        ? detail.priceGroup
                        : "No Data Available"
                    }
                  >
                    {customerPriceGroupOptions.map((value, i) => (
                      <MenuItem className={classes.listItem} key={i} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
              control={control}
              name="select"
            />
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="retailPriceGroup">Retail Price Group</label>
          {detail && (
            <Controller
              as={
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    MenuProps={{ getContentAnchorEl: null, anchorOrigin: { vertical: "bottom", horizontal: -12, } }}
                    disabled
                    IconComponent={() => (
                      <Icon
                        className="fas fa-chevron-down"
                        style={{
                          fontSize: ".75rem",
                          paddingRight: "20px"
                        }}
                      />
                    )}
                    labelId="retailPriceGroup-label"
                    id="retailPriceGroup"
                    value={
                      !!(detail && detail.retailPriceGroup)
                        ? detail.retailPriceGroup
                        : "No Data Available"
                    }
                  >
                    {retailPriceGroupOptions.map((value, i) => (
                      <MenuItem className={classes.listItem} key={i} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
              control={control}
              name="select"
            />
          )}
        </div>
      </div>

      <div className="row row-wrapper">
        <div className="col-md-6">
          <label htmlFor="Store Name">Store Name</label>
          <input
            type="text"
            placeholder="No Data Available"
            name="storeName"
            ref={register}
            value={detail && detail.storeName}
            disabled
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="closingItem">Closing Time</label>
          <input
            type="text"
            placeholder="No Data Available"
            name="closingTime"
            ref={register}
            value={detail && detail.closingTime}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

CustomerDetails.propTypes = {
  fields: PropTypes.any
};

export default CustomerDetails;
