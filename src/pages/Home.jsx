import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { SiStyleshare } from "react-icons/si";

const Home = () => {
  return (
    <>
      <title>Welcome to Parralel Store</title>
      <section className={styles.homeSection}>
        <div className={styles.marketing}>
          <h2>
            Parrallel Clocks
            {/* <SiStyleshare /> */}
          </h2>
          <div className={styles.imageContainer}>
            <img
              src="https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className={styles.image}
            />
            <Link to="/catalogue" className={styles.cta}>
              Browse Now
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.banner}>
        <div className={styles.hero}>
          <h2 className={styles.heading}>Pure style, zero effort</h2>
          <p className={styles.quote}>
            "Discover premium daily wear made to move with you."
          </p>
        </div>
      </section>
      {/* have the produc id in function call parameters */}
    </>
  );
};
export default Home;
