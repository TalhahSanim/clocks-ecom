// Store Admin Page -> Heading, Add Clock and statistics and table
import { Link } from "react-router-dom";
import ProductList from "../components/products/ProductList";
import { useAuth } from "../context/useAuth";
import { TbPlus } from "react-icons/tb";
import styles from "./ProductsPage.module.css";
function ProductsPage() {
  const { user } = useAuth();
  const isAdmin = user?.admin === true;

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Store Admin</h1>
          <p className={styles.subtitle}>Admins only. Add, edit and delete clocks.</p>
        </div>
        <Link to="/products/add" className={styles.addButton}>
          <TbPlus aria-hidden="true" /> Add Clock
        </Link>
      </div>

      <ProductList />
    </section>
  );
}
export default ProductsPage;
