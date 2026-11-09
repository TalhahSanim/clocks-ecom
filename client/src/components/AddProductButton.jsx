import { seedProducts } from "../api/products";
import styles from "./AddProductButton.module.css";
function AddProductButton() {
  return (
    <button className={styles.button} onClick={() => seedProducts()}>
      Seed DataBase
    </button>
  );
}
export default AddProductButton;
