// About -> text and three bullet points on left and image on right
import { Link } from "react-router-dom";
import { TbCheck } from "react-icons/tb";
import styles from "./About.module.css";
// About image
import aboutImage from "../assets/about.jpg";

export default function About() {
  return (
    <>
      <title>About | Parallel Clocks</title>

      <section className={styles.panel}>
        <div>
          <h1 className={styles.heading}>About Parallel Clocks</h1>
          <p className={styles.intro}>
            Parallel Clocks is a small online shop for wall, mantel, alarm, desk and floor clocks.
          </p>
          <p className={styles.muted}>
            Every clock in the range is listed with real photos, its price and how many are in stock, so you know what
            you are getting before you check out.
          </p>
          {/* the three featured bullets */}
          <ul className={styles.bullets}>
            <li>
              <TbCheck aria-hidden="true" /> Browse by category and sort by price or newest
            </li>
            <li>
              <TbCheck aria-hidden="true" />
              Save clocks for later and come back to them
            </li>
            <li>
              <TbCheck aria-hidden="true" />
              See every order you have placed in My orders
            </li>
          </ul>
          <Link to="/catalogue" className={styles.primary}>
            Shop The Range
          </Link>
        </div>
        <img src={aboutImage} alt="A letter watch laid out  on a table" className={styles.image} />
      </section>
    </>
  );
}
