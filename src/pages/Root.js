import React from "react";
import PropTypes from "prop-types";

function Root(props) {
  return <div className="Root">{props.children}</div>;
}

Root.propTypes = {
  children: PropTypes.any
};

export default Root;
