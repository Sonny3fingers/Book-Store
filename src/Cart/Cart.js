import React, { useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../hooks/useHttp";

import classes from "./Cart.module.css";
import { useContext } from "react/cjs/react.development";

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const cartItemAddHandler = (item) => {
    cartContext.addItem(item);
  };

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const {
    isLoading: isSubmitting,
    error,
    sendRequest: sendOrderRequest,
  } = useHttp();

  const submitOrderHandler = async (userData) => {
    sendOrderRequest({
      url: "https://book-store-app-c78b0-default-rtdb.europe-west1.firebasedatabase.app/order.json",
      method: "POST",
      body: {
        user: userData,
        orderedItems: cartContext.items,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    setDidSubmit(true);
    cartContext.clearCart();
  };

  const cartItems = (
    <ul className={classes.cartList}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          title={item.title}
          author={item.author}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <React.Fragment>
      <button onClick={props.onHideCart}>Close</button>
      <button onClick={orderHandler}>Order</button>
    </React.Fragment>
  );

  const cartModalContent = (
    <React.Fragment>
      <div className={classes.cart}>
        <h3>Your Cart</h3>
        {cartItems}
        <div className={classes.totalAmount}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {!isCheckout && modalActions}
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler} />
      )}
    </React.Fragment>
  );

  const cartSubmittingModalContent = <p>Sending order data.</p>;

  const cartDidSubmitModalContent = (
    <React.Fragment>
      <p>Order data successfully submitted.</p>
      <button className={classes.button} onClick={props.onHideCart}>
        Close
      </button>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !didSubmit && cartSubmittingModalContent}
      {!isSubmitting && didSubmit && cartDidSubmitModalContent}
    </Modal>
  );
};

export default Cart;
