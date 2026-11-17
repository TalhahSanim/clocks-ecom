//  Admin -> Change Clock -> Image optional? and no new files keep old one
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById, update } from "../api/products";
import { errorMessage } from "../api/api";
import ProductForm from "../components/products/ProductForm";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getById(id)
      .then(setProduct)
      .catch((err) => setError(errorMessage(err)));
  }, [id]);

  if (error) return <p role="alert">{error}</p>;
  // Wait for clock then from is filled in
  if (!product) return <p>Loading...</p>;

  return (
    <section style={{ maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Edit {product.name}</h1>
      <ProductForm
        initial={product}
        submitLabel="Save Changes"
        onSubmit={async (formData) => {
          await update(id, formData);
          navigate(`/products/${id}`);
        }}
      />
    </section>
  );
}
