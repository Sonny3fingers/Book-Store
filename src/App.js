import React, { useState } from "react";
import Books from "./Books/Books";
import Cart from "./Cart/Cart";
import CartProvider from "./store/CartProvider";

import Header from "./Layout/Header";

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Books />
    </CartProvider>
  );
}

export default App;
