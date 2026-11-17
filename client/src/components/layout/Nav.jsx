import { Link, NavLink } from "react-router-dom";
import { TbShoppingCart } from "react-icons/tb";
import { useCart } from "../../context/useCart";
import styles from "./Nav.module.css";
import { RiLoginBoxFill } from "react-icons/ri";
import { MdSell } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { TbHomeFilled } from "react-icons/tb";
import { MdAccountBox } from "react-icons/md";

const linkClass = ({ isActive }) => (isActive ? styles.active : styles.inactive);

function Nav() {
  const { count } = useCart();

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
        <Link to="/cart" className={styles.cart} aria-label={`Cart, ${count} items`}>
          <TbShoppingCart size={30} />
          {count > 0 && <span className={styles.badge}>{count}</span>}
        </Link>
      </nav>
    </>
  );
}
export default Nav;
