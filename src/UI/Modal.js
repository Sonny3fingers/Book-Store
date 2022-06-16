import React from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import Card from "./Card";

import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <React.Fragment>
      {createPortal(
        <Backdrop onHideCart={props.onHideCart} />,
        document.getElementById("modal")
      )}
      {createPortal(
        <div className={classes.modal}>{props.children}</div>,
        document.getElementById("modal")
      )}
    </React.Fragment>
  );
};

export default Modal;
