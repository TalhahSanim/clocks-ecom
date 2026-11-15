//  The store -> every clock from the API
import { useEffect, useState } from "react";
import { getAll } from "../api/products";
import { errorMessage } from "../api/api";
import ProductCard from "../components/ProductCard";
import styles from "./Catalogue.module.css";

// Dropdown selections
const CATEGORIES = [
  "all",
  "wall",
  "mantel",
  "alarm",
  "floor",
  "desk",
  "watch",
  "hourglass",
];

const SORTS = [
  {
    value: "name",
    label: "Name A-Z",
  },
  {
    value: "price",
    label: "Price: Low To High",
  },
  {
    value: "price-desc",
    label: "Price: High To Low",
  },
  {
    value: "newest",
    label: "Newest",
  },
];
export default function Catalogue({ onCartAdd }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("name");

  // Load again when category/sort changes
  useEffect(() => {
    setLoading(true);
    setError("");
    getAll({ category, sort })
      .then(setProducts)
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  }, [category, sort]);
  return (
    <div className={styles.productCatalogue}>
      <h2 className={styles.catalogueTitle}>Our Collection</h2>

      {/* Filter and Sort Controls */}
      <div className={styles.controls}>
        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {loading && <p className={styles.status}>Loading Clocks...</p>}
      {error && (
        <p className={styles.status} role="alert">
          {error}
        </p>
      )}
      {!loading && !error && products.length === 0 && (
        <p className={styles.status}>No {category} Clocks Yet.</p>
      )}

      <ul className={styles.productList}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index}>
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
