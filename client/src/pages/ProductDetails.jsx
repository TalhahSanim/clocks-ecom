// One Clock full size with product info
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getById } from "../api/products";
import { errorMessage } from "../api/api";
import { useAuth } from "../context/UseAuth";
import styles from "./ProductDetails.module.css";

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  // Load Again when the id in the URL Changes
  useEffect(() => {
    getById(id)
      .then(setProduct)
      .catch((err) => setError(errorMessage(err)));
  }, [id]);

  if (error) return <p role="alert">{error}</p>;
  if (!product) return <p>Loading...</p>;
  return (
  <article className={styles.details}>
    <img src={product.image}  alt={product.name} className={styles.image} />
    <div>
      <h1>{product.name}</h1>
      <p className={styles.category}>{product.category}</p>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      <p>{product.stock > 0 ? `${product.stock} in stock`:"Sold Out"}</p>
      {user?.admin && <Link to={`/products/${id}/edit`}>Edit Clock</Link>}
      <Link to="/catalogue">⬅️ Back To Catalogue</Link>
    </div>
  </article>
  )
}
