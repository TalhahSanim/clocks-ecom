import styles from "./ExtendedNav.module.css";
import AuthStatus from "./AuthStatus";
function ExtendedNav() {
  return (
    <div className={styles.navBar}>
      <h1 className={styles.navTitle}>Parralel Clocks</h1>
      <img
        src="https://images.unsplash.com/vector-1784595499256-94275a472f73?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0"
        alt="Hero Image"
        className={styles.heroImage}
      />
      <h2 className={styles.tagline}>Timeless design, delivered on time.</h2>
      <AuthStatus />
    </div>
  );
}
export default ExtendedNav;
