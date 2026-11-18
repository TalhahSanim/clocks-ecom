// One Clock full size with product info
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getById } from "../api/products";
import { errorMessage } from "../api/api";
import { useAuth } from "../context/useAuth";
import AddToCartButton from "../components/products/AddToCartButton";
import SaveButton from "../components/products/SaveButton";
import { TbArrowNarrowLeft } from "react-icons/tb";
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

  const inStock = product.stock > 0;
  return (
    <article className={styles.panel}>
      <Link to="/catalogue" className={styles.back}>
        <TbArrowNarrowLeft aria-hidden="true" /> Back To Catalogue
      </Link>

      <div className={styles.details}>
        <img src={product.image} alt={product.name} className={styles.image} />

        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={inStock ? styles.inStock : styles.soldOut}>
            {inStock ? `${product.stock} In Stock ` : "Sold Out"}
          </p>

          {/* Buttons -> Add Cart and Save for later */}
          <div className={styles.actions}>
            <AddToCartButton product={product} />
            <SaveButton clock={product} />
            {user?.admin && (
              <Link to={`/inventory/${id}/edit`} className={styles.edit}>
                Edit Clock
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
