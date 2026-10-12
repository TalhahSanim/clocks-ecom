import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/UseAuth";

import Home from "./pages/Home";
import About from "./pages/About";
import Nav from "./components/Nav";
import Users from "./pages/Catalogue";
import UserDetail from "./pages/CatalogueDetails";
import { useState } from "react";
import ProductsPage from "./pages/ProductsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
// import styles from "./App.module.css";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(productName) {
    // function addToCart(productId)
    setCart((prevCartProducts) => [...prevCartProducts, productName]);

    // setCart((prevCartProducts)=> [...prevCartProducts, product])
  }
  return (
    <div>
      <Nav cartCount={cart} />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/catalogue"
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
      <Footer />
    </div>
  );
}
export default App;
