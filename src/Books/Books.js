import React from "react";
import BooksSummary from "./BooksSummary";

import classes from "./Books.module.css";
import AvailableBooks from "./AvailableBooks";

const Books = (props) => {
  return (
    <div className={classes.booksContainer}>
      <BooksSummary />
      <AvailableBooks />
    </div>
  );
};

export default Books;
