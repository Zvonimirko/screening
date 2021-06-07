import React from "react";
import PropTypes from "prop-types";

import "./userData.scss";

const UserData = ({ user: { firstName, lastName }, updateUser }) => {
  const handleClick = () => {
    localStorage.removeItem("token");
    updateUser(null);
  };

  return (
    <div className="userData">
      <h2>
        Username:{" "}
        <span>
          {firstName} {lastName}
        </span>
      </h2>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

UserData.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserData;
