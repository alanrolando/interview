import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import Logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../../Redux/UserAuth/AuthActions";

const Login = ({ logIn, isUserLoggedIn }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    isUserLoggedIn &&
       navigate("dashboard/");
  }, [isUserLoggedIn]);

  const updateCredentials = (e) => {
    setCredentials((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn({ ...credentials });
  };

  return (
    <div className={styles.login}>
      <img className={styles.logo} src={Logo} alt="logo" />
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          className={styles.loginInput}
          type="text"
          placeholder="Enter Username"
          value={credentials.email}
          name="email"
          onChange={updateCredentials}
        />
        <input
          className={styles.loginInput}
          type="password"
          name="password"
          placeholder="Enter Password"
          value={credentials.password}
          onChange={updateCredentials}
        />
        <button className={styles.loginBtn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.authReducer.isUserLoggedIn,
    error: state.authReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (credentials) => dispatch(logIn({ ...credentials })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
