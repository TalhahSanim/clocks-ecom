// Saved For Later -> users saved clocks with add to cart and remove
import { Link } from "react-router-dom";
import { useSaved } from "../context/useSaved";
import ProductCard from "../components/products/ProductCard";
import AddToCardButton from "../components/products/AddToCartButton";
import SaveButton from "../components/products/SaveButton";
import styles from "./Catalogue.module.css";

export default function SavedPage() {
  const { saved } = useSaved();

  if (saved.length === 0) {
    return (
      <section className={styles.productCatalogue}>
        <h2 className={styles.catalogueTitle}>Saved For Later</h2>
        <p className={styles.status}>
          Nothing Saved Yet. Click <b>Save For Later</b> On any Clock
        </p>
        <Link to="/catalogue">Browse Clocks</Link>
      </section>
    );
  }
  return (
    <section className={styles.productCatalogue}>
      <h2 className={styles.catalogueTitle}>Saved For Later</h2>
      <p>
        {saved.length} {saved.length === 1 ? "clock" : "clocks"} You Saved
      </p>
      <ul className={styles.productList}>
        {saved.map((clock) => (
          <ProductCard key={clock.id} product={clock}>
            <SaveButton clock={clock} />
            <AddToCardButton product={clock} />
          </ProductCard>
        ))}
      </ul>
    </section>
  );
}
