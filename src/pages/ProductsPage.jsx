import AddProductButton from "../components/AddProductButton";
import ProductList from "../components/ProductList";
import { useAuth } from "../context/UseAuth";
function ProductsPage() {
  const { isLoggedIn, user } = useAuth();
  const isAdmin = isLoggedIn && user?.admin === true;

  return (
    <div>
      <h2 style={{ color: "white", fontSize: "2rem", marginBottom: "2rem" }}>
        Store Admin
      </h2>
      {isAdmin && <AddProductButton />}

      <div>
        <ProductList isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      </div>
    </div>
  );
}
export default ProductsPage;
