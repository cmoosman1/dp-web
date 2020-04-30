/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../forms/FormsLayout.css";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const InvoiceBilling = props => {
  const [detail, setDetail] = useState({});
  useEffect(() => {
    setDetail(props.fields);
  }, [props.fields]);

  const { register } = useForm({
    defaultValues: {
      minAmt: (detail && detail.minAmt) || "No Data Available",
      billToCustomer: (detail && detail.billToCustomer) || "No Data Available",
      taxRate: (detail && detail.taxRate) || "No Data Available",
      invoiceHeader: (detail && detail.invoiceHeader) || "No Data Available",
      noCredits: (detail && detail.noCredits) || "No Data Available",
      billToStoreAddress:
        (detail && detail.billToStoreAddress) || "No Data Available"
    }
  });

  const handleChange = e => {
    console.log(e);
  };
  return (
    <div className="form-wrapper form-wrapper">
      <div className="row row-wrapper">
        <div className="col-md-6">
          <label htmlFor="minimumAmout">Minimum Amount</label>
          <input
            name="minimumAmout"
            type="text"
            placeholder="No Data Available"
            ref={register}
            value={detail && detail.minAmt}
            disabled
          />
        </div>
        <div className="col-md-6 top-spacer">
          <FormControlLabel
            className="input-checkbox"
            control={<Checkbox disabled color="primary" checked={!!(detail && detail.noCredits)} onChange={handleChange} />}
            label="No Credits"
            labelPlacement="end"
          />
        </div>
      </div>

      <div className="row row-wrapper">
        <div className="col-md-6">
          <label htmlFor="billToCustomer">Bill To Customer</label>
          <input
            name="billToCustomer"
            type="text"
            placeholder="No Data Available"
            ref={register}
            value={detail && detail.billToCustomer}
            disabled
          />
        </div>
        <div className="col-md-6 top-spacer">
          <FormControlLabel
            className="input-checkbox"
            control={<Checkbox disabled color="primary" checked={!!(detail && detail.billToStoreAddress)} onChange={handleChange} />}
            label="Bill to Store Address"
            labelPlacement="end"
          />
        </div>
      </div>

      <div className="row row-wrapper">
        <div className="col-md-6">
          <label htmlFor="taxRate">Tax Rate</label>
          <input
            name="taxRate"
            type="text"
            placeholder="No Data Available"
            ref={register}
            value={detail && detail.taxRate + '%'}
            disabled
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="invoiceHeader">Invoice Header</label>
          <input
            name="invoiceHeader"
            type="text"
            placeholder="No Data Available"
            ref={register}
            value={detail && detail.invoiceHeader}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

InvoiceBilling.propTypes = {
  fields: PropTypes.any
};

export default InvoiceBilling;
