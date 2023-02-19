import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCart, increment, decrement, deleteProduct } from "./cartSlice";
import styles from "./Cart.module.css";

export function Cart() {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  let total = 0;
  cart.forEach((row) => {
    total += row.price * row.amount;
  });

  return (
    <div>
      <div className={styles.row}>
        <table 
        className={styles.table}>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>amount</th>
            <th>total</th>
            <th>-</th>
            <th>+</th>
            <th>delete</th>
          </tr>
          {cart.map((row) => (
            <tr>
              <td>{row.name}</td>
              <td>{row.price.toFixed(2)}</td>
              <td>{row.amount}</td>
              <td>{(row.price * row.amount).toFixed(2)}</td>
              <td><button onClick={() => dispatch(decrement(row.productId))}>-</button></td>
              <td><button onClick={() => dispatch(increment(row.productId))}>+</button></td>
              <td><button onClick={() => dispatch(deleteProduct(row.productId))}>Delete</button></td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>Total:</td>
            <td>{total.toFixed(2)}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  );
}
