import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Catalogue from "./pages/Catalogue";
import ProductDetails from "./pages/ProductDetails";
import ProductsPage from "./pages/ProductsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [cart, setCart] = useState([]);
  const addToCart = (productName) => setCart((prev) => [...prev, productName]);
  return (
    // AuthProvider around everything to let nav determine identity
    <AuthProvider>
      <Nav cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Store -> logged in users */}
        <Route
          path="/catalogue"
          element={
            <ProtectedRoute>
              <Catalogue onCartAdd={addToCart} />
            </ProtectedRoute>
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Store Admin  */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}
