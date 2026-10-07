import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/UseAuth";

import Home from "./pages/Home";
import About from "./pages/About";
import Nav from "./components/Nav";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import { useState } from "react";
import ProductsPage from "./pages/ProductsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import styles from "./App.module.css";

function AuthStatus() {
  const { isLoggedIn, user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <h3 className={styles.loading}>Checking Login Status...</h3>;
  }

  if (!isLoggedIn) {
    return <span className={styles.authStatus}>You are not Logged In!</span>;
  }

  return (
    <>
      <h3 className={styles.authStatus}>Welcome, {user.name}</h3>
      <button onClick={logout} className={styles.logoutButton}>
        Logout
      </button>
    </>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(productName) {
    // function addToCart(productId)
    setCart((prevCartProducts) => [...prevCartProducts, productName]);

    // setCart((prevCartProducts)=> [...prevCartProducts, product])
  }
  return (
    <div>
      <AuthProvider>
        <div className={styles.navBar}>
          <Nav cartCount={cart} />
          <AuthStatus />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users onCartAdd={addToCart} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users/:id/:name"
            element={
              <ProtectedRoute>
                <UserDetail />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
export default App;
