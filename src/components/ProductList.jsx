import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "../firebase";
import { decrementStock, removeDoc } from "../api/products";

function ProductList({ isLoggedIn, isAdmin }) {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     const productsRef = collection(db, "products");
  //     const snapshot = await getDocs(productsRef);

  //     const items = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     setProducts(items);
  //   }
  //   fetchProducts();
  // }, []);
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
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            backgroundColor: "#439899",
            padding: "15rem",
            boxShadow: "0 2px 5px #443df5",
            borderRadius: "2rem",
          }}
        >
          <h2 style={{ color: "white" }}>Product Inventory</h2>
          {products.map((product) => (
            <div style={{}}>
              <li key={product.id} style={{ color: "white" }}>
                {product.name} - {product.price} ({product.stock} in stock)
              </li>

              {isLoggedIn && !isAdmin && (
                <button
                  onClick={() => decrementStock(product.id, 1)}
                  style={{
                    padding: "22px",
                    backgroundColor: "rgb(35, 155, 35)",
                    display: "inline-block",
                    border: "none",
                    borderRadius: "5px",
                    margin: "20px",
                  }}
                >
                  Buy 1
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => removeDoc(product.id)}
                  style={{
                    padding: "22px",
                    backgroundColor: "maroon",
                    border: "none",
                    borderRadius: "5px",
                    margin: "20px",
                  }}
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
