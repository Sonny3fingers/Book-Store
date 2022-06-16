import React from "react";

import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h1>Book Store</h1>
      </div>
      <HeaderCartButton onShowCart={props.onShowCart} />
    </header>
  );
};

export default Header;
