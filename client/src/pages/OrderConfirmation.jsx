// Order confirmation -> with saved order coming from api

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../api/orders";
import { errorMessage } from "../api/api";
import { formatPrice } from "../utilities/formatPrice";
import styles from "./Cart.module.css";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrder(id)
      .then(setOrder)
      .catch((err) => setError(errorMessage(err)));
  }, [id]);

  if (error)
    return (
      <p role="alert" className={styles.empty}>
        {error}
      </p>
    );
  if (!order) return <p className={styles.empty}>Loading Your Order...</p>;
  return (
    <section className={styles.empty}>
      <div className={styles.check} aria-hidden="true">
        ✔️
      </div>
      <h1>Order Placed</h1>
      <p>
        <b>Order #{order.orderNumber}</b> . {order.itemCount} {order.itemCount === 1 ? "item" : "items"} .{" "}
        {formatPrice(order.total)}
      </p>
      <p className={styles.muted}>You Can See This Order Any Time Time In My Orders</p>
      <div className={styles.actions}>
        <Link to="/orders" className={styles.primary}>
          View My Orders
        </Link>
        <Link to="/catalogue" className={styles.back}>
          Keep Browsing
        </Link>
      </div>
    </section>
  );
}
