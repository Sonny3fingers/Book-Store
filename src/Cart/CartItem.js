import React from "react";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <li className={classes.cartItem}>
      <div className={classes.product}>
        <h2>{props.title}</h2>
        <small>by {props.author}</small>
      </div>
      <div className={classes.summary}>
        <span className={classes.price}>price: {props.price}</span>
        <span className={classes.amount}>X {props.amount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
