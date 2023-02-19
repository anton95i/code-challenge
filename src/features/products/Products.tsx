import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addProducts, selectProducts } from "./productsSlice";
import { addToCart } from "../cart/cartSlice";
import styles from "./Products.module.css";

export function Products() {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const [newProductsValue, setNewProducts] = useState("");

  const newProducts = String(newProductsValue) || "";

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <textarea
          className={styles.textarea}
          aria-label="Insert products"
          value={newProductsValue}
          onChange={(e) => setNewProducts(e.target.value)}
          placeholder="type here to add products eg (apple, 2, banana, 4.2, ...)"
        />
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Submit"
          onClick={() => {
            dispatch(addProducts(newProducts));
            setNewProducts("");
          }}
        >
          Submit
        </button>
      </div>
      {!(products.length == 0) && (
        <div className={styles.row}>
          <table className={styles.table}>
            <tr>
              <th>name</th>
              <th>price</th>
              <th>action</th>
            </tr>
            {products.map((product) => (
              <tr>
                <td>{product.name}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => dispatch(addToCart(product.id + "," + product.name + "," + product.price))}>Add To Cart</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
