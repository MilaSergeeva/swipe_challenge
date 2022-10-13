import React from "react";
import logoStyles from "./logo.module.css";
import logo from "../../images/logo.png";

function Logo() {
  return (
    <a href="https://try.no/">
      <img className={logoStyles.logo} src={logo} alt="logo" />
    </a>
  );
}

export default Logo;
