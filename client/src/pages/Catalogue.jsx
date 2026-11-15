//  The store -> every clock from the API
import { useEffect, useState } from "react";
import { getAll } from "../api/products";
import { errorMessage } from "../api/api";
import ProductCard from "../components/ProductCard";
import styles from "./Catalogue.module.css";

export default function Catalogue({ onCartAdd }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load Once when page opens
  useEffect(() => {
    getAll()
      .then(setProducts)
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.status}>Loading Clocks...</p>;
  if (error)
    return (
      <p className={styles.status} role="alert">
        {error}
      </p>
    );
  return (
    <div className={styles.productCatalogue}>
      <h2 className={styles.catalogueTitle}>Our Collection</h2>
      <ul className={styles.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product}>
            <button
              className={styles.button}
              onClick={() => onCartAdd(product.name)}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Sold Out" : "Add To Cart"}
            </button>
          </ProductCard>
        ))}
      </ul>
    </div>
  );
}
