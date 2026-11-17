// Store Admin -> Every Clock with Edit and Delete
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, remove } from "../api/products";
import { errorMessage } from "../api/api";
import ProductCard from "./ProductCard";
import ConfirmDelete from "./ConfirmDelete";
import { useToast } from "../context/ToastContext";

import styles from "./ProductList.module.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const load = () =>
    getAll()
      .then(setProducts)
      .catch((err) => setError(errorMessage(err)));

  useEffect(() => {
    load();
  }, []);

  const toast = useToast();

  // Delete and reload the list
  async function handleDelete(product) {
    try {
      await remove(product.id);
      load();
      toast(`${product.name} deleted`, "success");
    } catch (err) {
      toast(errorMessage(err), "error");
    }
  }
  return (
    <div className={styles.panel}>
      <h2 className={styles.heading}>Product Inventory</h2>
      {error && <p role="alert">{error}</p>}
      <ul className={styles.list}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product}>
            <span>{product.stock} in stock</span>
            <Link to={`/products/${product.id}/edit`} className={styles.editButton}>
              Edit
            </Link>
            <ConfirmDelete name={product.name} onConfirm={() => handleDelete(product)} />
          </ProductCard>
        ))}
      </ul>
    </div>
  );
}
