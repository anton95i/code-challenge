import React from "react";
//import logo from "./logo.svg";
import { Products } from "./features/products/Products";
import { Cart } from "./features/cart/Cart";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>Products</h4>
        <Products />
        <h4>Cart</h4>
        <Cart />
      </header>
    </div>
  );
}

export default App;
