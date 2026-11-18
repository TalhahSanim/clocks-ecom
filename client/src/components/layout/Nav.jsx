// Site header -> logo Links,search and cart and account
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TbSearch, TbShoppingCart, TbUser } from "react-icons/tb";
import { useAuth } from "../../context/useAuth";
import { useCart } from "../../context/useCart";
import AccountMenu from "./AccountMenu";
import ThemeToggle from "./ThemeToggle";
import styles from "./Nav.module.css";

import logo from "../../assets/logo.svg";

// current page link turns to light pill
const linkClass = ({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link);

export default function Nav() {
  const { user } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Search sends user to catalogue with ?q=  and this filters via name
  function handleSearch(e) {
    e.preventDefault();
    navigate(`/catalogue?q=${encodeURIComponent(search.trim())}`);
  }
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <img src={logo} alt="" className={styles.logo} /> Parallel Clocks
      </Link>

      <nav className={styles.links} aria-label="main">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/catalogue" className={linkClass}>
          Catalogue
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        {user?.admin && (
          <NavLink to="/inventory" className={linkClass}>
            Inventory
          </NavLink>
        )}
      </nav>

      <div className={styles.tool}>
        <form role="search" className={styles.search} onSubmit={handleSearch}>
          <TbSearch aria-hidden="true" />
          <input
            type="search"
            placeholder="Search Clocks"
            aria-label="Search Clocks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <Link to="/cart" className={styles.cart} aria-label={`Cart, ${count} items`}>
          <TbShoppingCart size={28} />
          {count > 0 && <span className={styles.badge}>{count}</span>}
        </Link>

        {user ? (
          <AccountMenu />
        ) : (
          <Link to="/login" className={styles.login}>
            <TbUser size={22} aria-hidden="true" /> Login
          </Link>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
