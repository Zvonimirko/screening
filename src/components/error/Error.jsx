import React from "react";
import PropTypes from "prop-types";

import "./error.scss";

const Error = ({ text }) => {
  return <p className="error">{text}</p>;
};

Error.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Error;
