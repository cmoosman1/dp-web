/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, FormControl, MenuItem } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { useForm, Controller } from "react-hook-form";
import states from "components/forms/states.js";
import useDimensions from "react-use-dimensions";

import "../forms/FormsLayout.css";


const ContactInfo = props => {
  const [detail, setDetail] = useState({});
  const [selectRef, { width }] = useDimensions();
  useEffect(() => {
    setDetail(props.fields);
  }, [props.fields]);
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

  const { control, register } = useForm({
    defaultValues: {
      addressLine1: (detail && detail.addressLine1) || "No Data Available",
      addressLine2: (detail && detail.addressLine2) || "No Data Available",
      city: (detail && detail.city) || "No Data Available",
      state: (detail && detail.state) || "No Data Available",
      zipCode: (detail && detail.zipCode) || "No Data Available",
      phone: (detail && detail.phone) || "No Data Available"
    }
  });

  return (
    <div className="form-wrapper form-wrapper">
      <div className="row row-wrapper">
        <div className="col-md-6">
          <label htmlFor="streetAddress">Street Address</label>
          <input
            name="streetAddress"
            type="text"
            placeholder="No Data Available"
            ref={register}
            value={detail && detail.addressLine1}
            disabled
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="streetAddress2">Street Address 2</label>
          <input
            name="streetAddress2"
            type="text"
            placeholder="No Data Available"
            ref={register}
            value={detail && detail.addressLine2}
            disabled
          />
        </div>
      </div>

      <div className="row row-wrapper">
        <div className="col-md-6">
          <label htmlFor="city">City</label>
          <input
            name="city"
            type="text"
            placeholder="No Data Available"
            ref={register}
            value={detail && detail.city}
            disabled
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="state">State</label>
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
                    labelId="state-label"
                    id="state"
                    value={
                      !!(detail && detail.state) 
                        ? detail.state 
                        : "No Data Available"
                    }
                  >
                    {states.map((value, i) => (
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
          <label htmlFor="zip">Zip Code</label>
          <input
            name="zip"
            type="text"
            placeholder="No Data Available"
            ref={register}
            value={detail && detail.zipCode}
            disabled
          />
        </div>
      </div>

      <div className="row row-wrapper">
        <div className="col-md-6">
          <label htmlFor="storePhoenNumber">Store Phone Number</label>
          <input
            name="storePhoenNumber"
            type="text"
            placeholder="No Data Available"
            ref={register}
            value={detail && detail.phone}
            disabled
          />
        </div>
        <div className="col-md-6" />
      </div>
    </div>
  );
};
ContactInfo.propTypes = {
  fields: PropTypes.any
};
export default ContactInfo;
