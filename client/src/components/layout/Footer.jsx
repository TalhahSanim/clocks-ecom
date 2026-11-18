// Site Footer -> brand, link columns
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

import logo from "../../assets/logo.svg";

//  label and path for each column and every path is page from the app
const columns = [
  {
    title: "Store",
    links: [
      ["Catalogue", "/catalogue"],
      ["New Selections", "/"],
      ["Saved For Later", "/saved"],
    ],
  },
  {
    title: "Account",
    links: [
      ["Login", "/login"],
      ["Signup", "/signup"],
      ["My Orders", "/orders"],
    ],
  },
  {
    title: "Help",
    links: [
      ["About Us", "/about"],
      ["Cart", "/cart"],
      ["Checkout", "/checkout"],
    ],
  },
];
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.brand}>
          <p className={styles.brandName}>
            <img src={logo} alt="" className={styles.logo} />
            Parallel Clocks
          </p>
          <p>Wall, mantel, alarm and desk clocks, delivered in pristine condition</p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} className={styles.column} aria-label={column.title}>
            <p className={styles.columnTitle}>{column.title}</p>
            {column.links.map(([label, to]) => (
              <Link key={label} to={to}>
                {label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className={styles.bottom}>
        <span>© {year} Parallel Clocks</span>
        <span>High Quality Timepieces</span>
      </div>
    </footer>
  );
}
