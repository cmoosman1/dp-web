/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from 'prop-types'

const height = window.innerHeight - 50;

function PDFGenerator({ pdfByteData }) {
  PDFGenerator.propTypes = {
    pdfByteData: PropTypes.any,
  }
  return (
    <object
      alt="pdf"
      style={{ width: "1000px", height: height }}
      type="application/pdf"
      data={"data:application/pdf;base64," + pdfByteData}
    ></object>
  );
}

export default PDFGenerator;
