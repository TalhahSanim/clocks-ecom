import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import { RiLoginBoxFill } from "react-icons/ri";
import { MdSell } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
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
          <TbHomeFilled size={30} />
          Home
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          <FcAbout />
          About
        </NavLink>

        <NavLink to="/catalogue" className={linkClass}>
          <IoStorefrontOutline size={30} />
          Catalogue
        </NavLink>

        <NavLink to="/products" className={linkClass}>
          <MdSell size={30} />
          Products
        </NavLink>
        <NavLink to="/signup" className={linkClass}>
          <MdAccountBox size={30} />
          Signup
        </NavLink>
        <NavLink to="/login" className={linkClass}>
          <RiLoginBoxFill className={styles.loginIcon} size="1rem" />
          Login
        </NavLink>
      </nav>
    </>
  );
}
export default Nav;
