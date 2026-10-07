import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import { RiLoginBoxFill } from "react-icons/ri";
import { MdSell } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FcAbout } from "react-icons/fc";
import { TbHomeFilled } from "react-icons/tb";
import { MdAccountBox } from "react-icons/md";

const linkClass = ({ isActive }) =>
  isActive ? styles.active : styles.inactive;
function Nav({ cartCount }) {
  return (
    <>
      <nav className={styles.nav}>
        <NavLink to="/" end className={linkClass}>
          <TbHomeFilled />
          Home
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          <FcAbout />
          About
        </NavLink>
        <NavLink to="/users" className={linkClass}>
          <FiUsers />
          Users
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          <MdSell />
          Products
        </NavLink>
        <NavLink to="/signup" className={linkClass}>
          <MdAccountBox />
          Signup
        </NavLink>
        <NavLink to="/login" className={linkClass}>
          <RiLoginBoxFill className={styles.loginIcon} size="1rem" />
          Login
        </NavLink>
      </nav>
      <h1 className={styles.navTitle}>Parralel Clocks</h1>
      <img
        src="https://images.unsplash.com/vector-1784595499256-94275a472f73?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0"
        alt="Hero Image"
        className={styles.heroImage}
      />
      <h2 className={styles.tageline}>Timeless design, delivered on time.</h2>
    </>
  );
}
export default Nav;
