import { NavLink } from "react-router-dom";
import "./Nav.css";
import { RiLoginBoxFill } from "react-icons/ri";
import { MdSell } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FcAbout } from "react-icons/fc";
import { TbHomeFilled } from "react-icons/tb";
import { MdAccountBox } from "react-icons/md";
import { FaCamera } from "react-icons/fa";

function Nav({ cartCount }) {
  return (
    <>
      <nav className="nav" style={{ marginBottom: "2rem" }}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <TbHomeFilled />
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <FcAbout />
          About
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <FiUsers />
          Users
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <MdSell />
          Products
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <MdAccountBox />
          Signup
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <RiLoginBoxFill style={{ color: "white" }} size="1rem" />
          Login
        </NavLink>{" "}
        {/* <h2
          style={{
            fontWeight: "600",
            color: "white",
            textAlign: "center",
            fontFamily: "inherit",
            fontSize: "1rem",
          }}
        >
          Parallels Store
        </h2> */}
      </nav>
      <h1
        style={{
          fontSize: "6rem",

          textAlign: "left",
          marginTop: "8rem",
          marginBottom: "10rem",
          textShadow: "4px 2px 2px rgba(0,0,0,0.5)",
          position: "relative",
        }}
        className="navTitle"
      >
        Parralel Clocks
      </h1>
      <img
        src="https://images.unsplash.com/vector-1784595499256-94275a472f73?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0"
        alt=""
        width="600px"
        style={{
          borderRadius: "20px",
          width: "200px",
        }}
      />
      <h2 style={{ textAlign: "right", color: "white", fontStyle: "italic" }}>
        Timeless design, delivered on time.
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "200px",
        }}
      ></div>
      {/* <FaCamera
            style={{
              marginRight: "6rem",
              display: "inline-block",
              border: "3px solid white",
              borderRadius: "5px",
              padding: "80px",
            }}
            size="9rem"
          /> */}
      {/* <div
        style={{
          color: "white",
          display: "flex",
          alignItems: "flex-end",
          gap: "2rem",
        }}
      >
        Live Inventory: {cartCount} <br />
      </div> */}
    </>
  );
}
export default Nav;
