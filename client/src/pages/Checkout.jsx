// Checkout -> delivery details and overview
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";
import { createOrder } from "../api/orders";
import { formatPrice } from "../utilities/formatPrice";
import form from "../styles/Form.module.css";
import styles from ".Cart.module.css";

export default function Checkout() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  // Name and email filled from logged in user
  const [values, setValues] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    postcode: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <section className={styles.empty}>
        <h1>Nothing To Checkout</h1>
        <Link to="/catalogue" className={styles.primary}>
          Browse Clocks
        </Link>
      </section>
    );
  }

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      // Only ids and quantities as server search the prices in fire store
      const order = await createOrder({
        items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
        shipping: values,
      });
      clearCart();
      navigate(`/orders/${order.id}`);
    } catch (err) {
      // Server Message -> such as bad request -> only 2 clocks remain
      setError(err.response?.data || "Your Order Could Not Be Placed");
      setSaving(false);
    }
  }
  return (
    <section className={styles.page}>
      <h1>Checkout</h1>
      <div className={styles.layout}>
        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          <h2>Your Details</h2>
          {/* Full Name */}
          <label className={form.field}>
            Full Name
            <input className={form.input} name="name" value={values.name} onChange={handleChange} required />
          </label>
          {/* Email */}
          <label className={form.field}>
            Email
            <input
              className={form.input}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </label>

          <h2>Delivery Address</h2>
          <label className={form.field}>
            Street Address
            <input className={form.input} name="address" value={values.address} onChange={handleChange} required />
          </label>
          <div className={styles.twoColumns}>
            <label className={form.field}>
              City
              <input className={form.input} name="city" value={values.city} onChange={handleChange} required />
            </label>
            <label className={form.field}>
              Postcode
              <input
                className={form.input}
                name="postcode"
                inputMode="numeric"
                pattern="\d{4}"
                value={values.postcode}
                onChange={handleChange}
                required
              />{" "}
            </label>
          </div>

          <p className={styles.note}>Placing Order and it saved to My Orders</p>
          {error && (
            <p className={form.error} role="alert">
              {error}
            </p>
          )}
          <button className={styles.primary} disabled={saving}>
            {saving ? "Placing Order...." : "Place Order"}
          </button>
        </form>

        <aside className={styles.overview}>
          <h2>Order Overview</h2>
          {items.map((item) => (
            <div key={item.id} className={styles.overviewRow}>
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <hr className={styles.divider} />
          <div className={styles.overviewRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={`${styles.overviewRow} ${styles.total}`}>
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
