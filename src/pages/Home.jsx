import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <title>Welcome to Parralel Store</title>
      <section>
        <div className={styles.hero}>
          <h2 className={styles.heading}>Pure style, zero effort</h2>
          <p className={styles.quote}>
            "Discover premium daily wear made to move with you."
          </p>
          <Link to="/products" className={styles.cta}>
            Browse Now
          </Link>
        </div>
      </section>
      {/* have the produc id in function call parameters */}
    </>
  );
};
export default Home;
