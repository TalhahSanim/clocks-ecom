import AddProductButton from "../components/AddProductButton";
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
        {isAdmin && <AddProductButton />}
        <div>
          <ProductList isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        </div>
      </div>
    </>
  );
}
export default ProductsPage;
