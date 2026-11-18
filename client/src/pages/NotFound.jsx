// Any Url with no page
import { Link } from "react-router-dom";
import { TbClockQuestion } from "react-icons/tb";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={styles.page}>
      <TbClockQuestion className={styles.icon} aria-hidden="true" />
      <h1>Page Not Found</h1>
      <p className={styles.muted}>That Page Doesn't Exist Or Link Is Out Of Date</p>
      <Link to="/catalogue" className={styles.primary}>
        Browse Clocks
      </Link>
      <Link to="/" className={styles.back}>
        Back To Home
      </Link>
    </section>
  );
}
