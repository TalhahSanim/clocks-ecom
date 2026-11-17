//  The store -> every clock from the API
import { useEffect, useState } from "react";
import { getAll } from "../api/products";
import { errorMessage } from "../api/api";
import ProductCard from "../components/products/ProductCard";
import AddToCartButton from "../components/products/AddToCartButton";
import CategoryFilter from "../components/products/CategoryFilter";
import SortSelect from "../components/products/SortSelect";
import styles from "./Catalogue.module.css";

export default function Catalogue() {
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
        <CategoryFilter value={category} onChange={setCategory} />
        <SortSelect value={sort} onChange={setSort} />
      </div>
      {loading && <p className={styles.status}>Loading Clocks...</p>}
      {error && (
        <p className={styles.status} role="alert">
          {error}
        </p>
      )}
      {!loading && !error && products.length === 0 && <p className={styles.status}>No {category} Clocks Yet.</p>}

      <ul className={styles.productList}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index}>
            <AddToCartButton product={product} />
          </ProductCard>
        ))}
      </ul>
    </div>
  );
}
