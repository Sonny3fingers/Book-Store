import React, { useRef } from "react";

import classes from "./BookItemForm.module.css";

const BookItemForm = (props) => {
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;

    const enteredAmountNumber = +enteredAmount;

    props.onAddItemToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.formControl}>
        <label>Amount</label>
        <input ref={amountInputRef} type="number" defaultValue="1" step="1" />
      </div>
      <button>+Add</button>
    </form>
  );
};

export default BookItemForm;
