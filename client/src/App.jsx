import { Routes, Route } from "react-router-dom";

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
import Cart from "./pages/Cart";
import SavedPage from "./pages/SavedPage";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { SavedProvider } from "./context/SavedContext";

export default function App() {
  return (
    // AuthProvider around everything to let nav determine identity
    <AuthProvider>
      <CartProvider>
        <SavedProvider>
          <Nav />
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
                  <Catalogue />
                </ProtectedRoute>
              }
            />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/saved"
              element={
                <ProtectedRoute>
                  <SavedPage />
                </ProtectedRoute>
              }
            />

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
          <Footer />
        </SavedProvider>
      </CartProvider>
    </AuthProvider>
  );
}
