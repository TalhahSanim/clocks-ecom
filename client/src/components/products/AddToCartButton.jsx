// Add to Cart until item is in the cart and -1 or + stepper control
import { useCart } from "../../context/useCart";
import styles from "./AddToCart.module.css";

export default function AddToCartButton({ product }) {
  const { items, addToCart, decreaseQuantity, removeFromCart } = useCart();
  // worked out by the cart on each render to ensure it has latest update
  const inCart = items.find((item) => item.id === product.id);

  if (product.stock === 0) {
    return (
      <button className={styles.add} disabled>
        Sold Out
      </button>
    );
  }

  if (!inCart) {
    return (
      <button className={styles.add} onClick={() => addToCart(product)}>
        Add To Cart
      </button>
    );
  }

  // at quantity 1 "-" removes the clock from the cart
  const handleSubtraction = () => (inCart.quantity === 1 ? removeFromCart(product.id) : decreaseQuantity(product.id));
  return (
    <div className={styles.stepper} role="group" aria-label={`Quantity of ${product.name}`}>
      <button className={styles.step} onClick={handleSubtraction} aria-label="One Less">
        -
      </button>
      <span className={styles.quantity} aria-live="polite">
        {inCart.quantity}
      </span>
      <button
        className={styles.step}
        onClick={() => addToCart(product)}
        disabled={inCart.quantity >= product.stock}
        aria-label="One More"
      >
        +
      </button>
    </div>
  );
}
