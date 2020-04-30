/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, FormControl, MenuItem } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { useForm, Controller } from "react-hook-form";
import Moment from "react-moment";
import useDimensions from "react-use-dimensions";

import "../forms/FormsLayout.css";


const SuppiesEmail = props => {
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
      suppliesEmail: (detail && detail.suppliesEmail) || "No Data Available",
      suppliesEmailType:
        (detail && detail.suppliesEmailType) || "No Data Available",
      suppliesEmailLastSent:
        (detail && detail.suppliesEmailLastSent) || "No Data Available"
    }
  });

  const suppliesEmailTypeOptions = [
    "Spinx-5354",
    "Bags wraps boxes    12114",
    "Bags, wraps, and Boxes   - HO-100",
    "Bags, wraps, and Boxes   - HO-11",
    "No Data Available"
  ];

  const dateToFormat = detail && detail.suppliesEmailLastSent;

  return (
    <div className="form-wrapper form-wrapper">
      <span className="email-status">
        Email last sent { !!(dateToFormat) ? <Moment format="MM/DD/YYYY">{dateToFormat}</Moment> : "No Data Available" }
      </span>

      <div className="row row-wrapper">
        <div className="col-md-6">
          <label htmlFor="emailAddress">Email Address</label>
          <input
            name="emailAddress"
            type="text"
            placeholder="No Data Available"
            ref={register}
            value={detail && detail.suppliesEmail}
            disabled
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="supplyType">Supply Type</label>
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
                    labelId="supplyType-label"
                    id="supplyType"
                    defaultValue={
                      detail && detail.suppliesEmailType
                        ? detail.suppliesEmailType
                        : "No Data Available"
                    }
                  >
                    {suppliesEmailTypeOptions.map((value, i) => (
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
    </div>
  );
};

SuppiesEmail.propTypes = {
  fields: PropTypes.any
};

export default SuppiesEmail;
