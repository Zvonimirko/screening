import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Error from "../error/Error";

import "./login.scss";

const Login = ({ updateUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    client: "",
    server: "",
  });

  const loginUser = async (formData) => {
    try {
      const res = await axios.post(
        "https://api.getcountapp.com/api/v1/authenticate",
        formData
      );
      const { firstName, lastName } = res.data.user;
      updateUser({
        firstName: firstName,
        lastName: lastName,
      });
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setError({ ...error, server: err.response.data.errorMessage });
      setTimeout(() => {
        setError({ ...error, server: "" });
      }, 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const testEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    if (testEmail.test(formData.username) && formData.password !== "") {
      loginUser(formData);
    } else {
      setError({ ...error, client: "Please write in email and password" });
      setTimeout(() => {
        setError({ ...error, client: "" });
      }, 3000);
    }
    setFormData({
      username: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form">
        {error.client !== "" && <Error text={error.client}></Error>}
        {error.server !== "" && <Error text={error.server}></Error>}
        <div className="login__form__inputs">
          <div className="login__form__inputs__input">
            <p>Username</p>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="login__form__inputs__input">
            <p>Password</p>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

export default Login;
