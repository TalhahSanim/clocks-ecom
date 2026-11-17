import styles from "./Footer.module.css";
import { SiStyleshare } from "react-icons/si";

function Footer() {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <h2>
        Parrallel Clocks <SiStyleshare />
      </h2>
      <p>&copy; {getCurrentYear()} Parallel Clocks. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
