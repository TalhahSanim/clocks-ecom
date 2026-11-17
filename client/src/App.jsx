import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AdminRoute from "./components/routes/AdminRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Catalogue from "./pages/Catalogue";
import ProductDetails from "./pages/ProductDetails";
import ProductsPage from "./pages/ProductsPage";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

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
            <AdminRoute>
              <ProductsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/products/add"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}
