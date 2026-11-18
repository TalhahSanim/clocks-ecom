// Store Admin on each order newest first with status
import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/orders";
import { errorMessage } from "../../api/api";
import { formatPrice } from "../../utilities/formatPrice";
import styles from "../../pages/MyOrders.module.css";
import StatusSelect from "./StatusSelect";

const statuses = ["Placed", "Shipped", "Delivered"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .catch((err) => setError(errorMessage(err)));
  }, []);

  // Save New Status then update that row
  async function changeStatus(id, status) {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
    } catch (err) {
      setError(errorMessage(err));
    }
  }
  return (
    <section className={styles.page}>
      <h2>Orders</h2>
      {error && <p role="alert">{error}</p>}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.orderNumber}</td>
                <td>{order.shipping.name}</td>
                <td>{formatPrice(order.total)}</td>
                <td>
                  <StatusSelect
                    value={order.status}
                    onChange={(status) => changeStatus(order.id, status)}
                    label={`Status Of Order ${order.orderNumber}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
