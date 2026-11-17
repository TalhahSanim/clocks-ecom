// The Cart one row per clock and the order overview
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import AddToCartButton from "../components/products/AddToCartButton";
import { formatPrice } from "../utilities/formatPrice";
import styles from "./Cart.module.css";

export default function Cart() {
  const { items, count, subtotal, removeFromCart } = useCart();

  // Cart empty?
  if (items.length === 0) {
    return (
      <section className={styles.empty}>
        <h1>Your Cart Is Empty</h1>
        <p>Find a Clock You Like and Click Add To Cart</p>
        <Link to="/catalogue" className={styles.primary}>
          Browse Clocks
        </Link>
      </section>
    );
  }
  return (
    <section className={styles.page}>
      <h1>Your Cart</h1>
      <p className={styles.muted}>
        {count} {count === 1 ? "item" : "items"}
      </p>

      <div className={styles.layout}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.row}>
              <Link to={`/products/${item.id}`}>
                <img src={item.image} alt={item.name} className={styles.thumbnail} />
              </Link>
              <div className={styles.info}>
                <h3>{item.name}</h3>
                <p className={styles.muted}>{item.category}</p>
              </div>
              {/* The cart item has id name and stock so it means the stepper controls will work here too */}
              <AddToCartButton product={item} />
              <p className={styles.linePrice}>{formatPrice(item.price * item.quantity)}</p>
              <button className={styles.remove} onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <aside className={styles.overview}>
          <h2>Order Overview</h2>
          <div className={styles.overviewRow}>
            <span>Subtotal</span>
            {formatPrice(subtotal)}
          </div>
          <div className={styles.overviewRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr className={styles.divider} />
          <div className={`${styles.overviewRow} ${styles.total}`}>
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <Link to="/checkout" className={styles.primary}>
            Checkout
          </Link>
          <Link to="/catalogue" className={styles.back}>
            🔙 Continue Browsing
          </Link>
        </aside>
      </div>
    </section>
  );
}
