import React, { useEffect, useState, useCallback } from "react";
import BookListItem from "./BookItem/BookListItem";
import Card from "../UI/Card";
import useHttp from "../hooks/useHttp";

import classes from "./AvailableBooks.module.css";

const AvailableBooks = (props) => {
  const [books, setBooks] = useState([]);

  const transformData = useCallback((dataObj) => {
    let loadedBookList = [];

    for (const key in dataObj) {
      loadedBookList.push({
        id: key,
        title: dataObj[key].title,
        author: dataObj[key].author,
        price: dataObj[key].price,
      });
      setBooks(loadedBookList);
    }
  }, []);

  const {
    isLoading,
    error: httpError,
    sendRequest: fetchBooks,
  } = useHttp(transformData);

  useEffect(() => {
    fetchBooks({
      url: "https://book-store-app-c78b0-default-rtdb.europe-west1.firebasedatabase.app/books.json",
    });
  }, [fetchBooks]);

  if (isLoading) {
    return (
      <section className={classes.loadingBooks}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.booksHttpError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const bookListItem = books.map((book) => (
    <BookListItem
      key={book.id}
      id={book.id}
      title={book.title}
      author={book.author}
      price={book.price}
    />
  ));
  return (
    <Card>
      <ul className={classes.bookList}>{bookListItem}</ul>
    </Card>
  );
};

export default AvailableBooks;
