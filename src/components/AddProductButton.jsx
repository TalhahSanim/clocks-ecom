import { seedProducts } from "../api/products";

function AddProductButton() {
  return (
    <button
      onClick={() => seedProducts()}
      style={{
        padding: "22px",
        backgroundColor: "rgb(51, 177, 164)",
        boxShadow: "2px 2px 2px rgb(170, 201, 204)",
        marginBottom: "5px",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Seed DataBase
    </button>
  );
}
export default AddProductButton;
