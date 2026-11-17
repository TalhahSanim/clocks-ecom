import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../api/products";
import ProductCard from "../components/products/ProductCard";
import styles from "./Home.module.css";

import heroImage from "../assets/pexels-photo-35463239.avif";

export default function Home() {
  const [newest, setNewest] = useState([]);

  // Newest Clocks -> orderBy createdAt desc  + limit 4
  useEffect(() => {
    getAll({ sort: "newest", limit: 4 })
      .then(setNewest)
      .catch(() => setNewest([]));
  }, []);
  return (
    <>
      <title>Welcome to Parallel Store</title>
      <section className={styles.hero}>
        <div>
          <p className={styles.tagline}>New Designs . Wall, Mantel, Alarm and Desk Clocks</p>
          <h1 className={styles.heading}>Parallel Clocks</h1>
          <p className={styles.intro}>
            Clocks chosen to keep good time and look good doing it. Browse the range, save your favourites and check out
            in a few clicks.
          </p>
          <div className={styles.buttons}>
            <Link to="/catalogue" className={styles.primary}>
              Shop The Range
            </Link>
            <Link to="/about" className={styles.secondary}>
              About Us
            </Link>
          </div>
        </div>
        <div className={styles.heroFrame}>
          <img src={heroImage} alt="A gold plated leather watch" className={styles.heroImage} />
        </div>
      </section>

      <section className={styles.selections}>
        <div className={styles.selectionsHeader}>
          <h2>New Selections</h2>
          <Link to="/catalogue" className={styles.secondary}>
            View All Clocks
          </Link>
        </div>
        <ul className={styles.grid}>
          {newest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>
    </>
  );
}
