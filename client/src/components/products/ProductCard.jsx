// One Clock -> image, name, price -> links to details page
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

// Display 88.95 as $88.95
const price = (number) =>
  Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(
    number,
  );
export default function ProductCard({ product, children }) {
  return (
    <li className={styles.card}>
      <Link to={`/products/${product.id}`} className={styles.link}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{price(product.price)}</p>
      </Link>
      {/* Buttons the under card such as Add to Cart, Edit and Delete  passed by the page */}
      {children && <div className={styles.actions}>{children}</div>}
    </li>
  );
}
