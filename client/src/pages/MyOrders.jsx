// My Orders: newest first with its status
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../api/orders";
import { errorMessage } from "../api/api";
import { formatPrice } from "../utilities/formatPrice";
import styles from "./MyOrders.module.css";

// Convert date to a readable format
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });

export default function MyOrders() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch((err) => setError(errorMessage(err)));
  }, []);

  if (error)
    return (
      <p role="alert" className={styles.page}>
        {error}
      </p>
    );
  if (!orders) return <p className={styles.page}>Loading Your Orders</p>;

  return (
    <section className={styles.page}>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>
          No Orders Yet. <Link to="/catalogue">Find a Clock</Link>
        </p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link to={`/orders/${order.id}`}>#{order.orderNumber}</Link>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
                  </td>
                  <td>{formatPrice(order.total)}</td>
                  <td>
                    <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
