import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "../firebase";
import { decrementStock, removeDoc } from "../api/products";
import styles from "./ProductList.module.css";
function ProductList({ isLoggedIn, isAdmin }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = collection(db, "products");
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(items);
    });
    return () => unsubscribe();
  });
  return (
    <div>
      <ul className={styles.list}>
        <div className={styles.panel}>
          <h2 className={styles.heading}>Product Inventory</h2>
          {products.map((product) => (
            <div key={product.id}>
              <li className={styles.item}>
                {product.name} - {product.price} ({product.stock} in stock)
              </li>

              {isLoggedIn && !isAdmin && (
                <button
                  onClick={() => decrementStock(product.id, 1)}
                  className={styles.buyButton}
                >
                  Buy 1
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => removeDoc(product.id)}
                  className={styles.deleteButton}
                >
                  Delete 1
                </button>
              )}
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
export default ProductList;
