// Admin -> Add a new Clock
import { useNavigate } from "react-router-dom";
import { create } from "../api/products";
import ProductForm from "../components/ProductForm";

export default function AddProduct() {
  const navigate = useNavigate();
  return (
    <section style={{ maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Add a Clock</h1>
      <ProductForm
        submitLabel="Add Clock"
        requireImage
        onSubmit={async (formData) => {
          const { id } = await create(formData);
          navigate(`/products/${id}`);
        }}
      />
    </section>
  );
}
