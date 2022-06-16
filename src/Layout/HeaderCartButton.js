import React, { useContext } from "react";

import classes from "./HeaderCartButton.module.css";
import CartContext from "../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  return (
    <button className={classes.headerCartButton} onClick={props.onShowCart}>
      <span>Your Cart</span>
      <span>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
