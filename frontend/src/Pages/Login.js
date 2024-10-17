import React from "react";
import LoginForm from "../Components/LoginForm";
import "../css/Login.css";
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";

const Login = () => {
  return (
    <>
      <LoginForm />
      <BAPO/>
    </>
  );
};

export default Login;