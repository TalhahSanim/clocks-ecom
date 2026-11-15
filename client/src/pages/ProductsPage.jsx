import { Link } from "react-router-dom";
import ExtendedNav from "../components/ExtendedNav";
import Nav from "../components/Nav";
import ProductList from "../components/ProductList";
import { useAuth } from "../context/UseAuth";
import styles from "./ProductsPage.module.css";
function ProductsPage() {
  const { isLoggedIn, user } = useAuth();
  const isAdmin = isLoggedIn && user?.admin === true;

  return (
    <>
      {/* <Nav cartCount={cart} /> */}
      <ExtendedNav />
      <div className={styles.header}>
        <h2 className={styles.heading}>Store Admin</h2>
        {isAdmin && (
          <Link to="/products/add" className={styles.addButton}>
            ➕ Add Clock
          </Link>
        )}
        <div>
          <ProductList />
        </div>
      </div>
    </>
  );
}
export default ProductsPage;
