import React, { useContext } from "react";
import BookItemForm from "./BookItemForm";
import CartContext from "../../store/cart-context";

import classes from "./BookListItem.module.css";

const BookListItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      title: props.title,
      author: props.author,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.book}>
      <div>
        <h3>{props.title}</h3>
        <span className={classes.author}>{props.author}</span>
        <span className={classes.price}>{`$${props.price}`}</span>
      </div>
      <div>
        <BookItemForm onAddItemToCart={addItemToCartHandler} />
      </div>
    </li>
  );
};

export default BookListItem;
