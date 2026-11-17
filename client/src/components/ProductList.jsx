// Store Admin -> statistics cards and table of every clock with edit and delete
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, remove } from "../api/products";
import { errorMessage } from "../api/api";
import { useToast } from "../context/ToastContext";
import ConfirmDelete from "./ConfirmDelete";
import styles from "./ProductList.module.css";

// at this level or under the stock shows red in low
const low_Stock = 5;
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const toast = useToast();

  const load = () =>
    getAll()
      .then(setProducts)
      .catch((err) => setError(errorMessage(err)));

  useEffect(() => {
    load();
  }, []);

  // Delete , then reload the list and confirmdelete already asks are you sure
  async function handleDelete(product) {
    try {
      await remove(product.id);
      toast(`${product.name} deleted`, "success");
      load();
    } catch (err) {
      toast(errorMessage(err), "error");
    }
  }

  // Three numbers at the top found from list
  const lowCount = products.filter((product) => product.stock <= low_Stock).length;
  const categoryNumber = new Set(products.map((product) => product.category)).size;
  return (
    <>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}

      <div className={styles.statistics}>
        <div className={styles.statistic}>
          <strong>{products.length}</strong>
          <span>Clocks Listed</span>
        </div>
        <div className={styles.statistic}>
          <strong className={styles.low}>{lowCount}</strong>
          <span>Low on Stock</span>
        </div>
        <div className={styles.statistic}>
          <strong>{categoryNumber}</strong>
          <span>Categories</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Clock</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Link to={`/products/${product.id}`} className={styles.item}>
                    <img src={product.image} alt="" className={styles.thumbnail} />
                    {product.name}
                  </Link>
                </td>
                <td className={styles.category}>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td className={product.stock <= low_Stock ? styles.low : undefined}>
                  {product.stock}
                  {product.stock <= low_Stock && " [Low Stock]"}
                </td>
                <td>
                  <div className={styles.actions}>
                    <Link to={`/products/${product.id}/edit`} className={styles.edit}>
                      Edit
                    </Link>
                    <ConfirmDelete name={product.name} onConfirm={() => handleDelete(product)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
