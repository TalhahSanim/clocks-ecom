// The cart for app and saved in local storage allowing refresh to keep it
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

const storageKey = "clock-cart";

// Read saved cart once when app starts.
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  // Save each time the cart changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  // Already  in cart? Add one and if new add it with the quantity wanted
  function addToCart(product) {
    setItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        if (found.quantity >= product.stock) return prev; // cannot buy more than stock
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      // Keep only what the cart requires
      const { id, name, price, image, category, stock } = product;
      return [...prev, { id, name, price, image, category, stock, quantity: 1 }];
    });
  }

  // -1 but never let it reduce below 1
  function decreaseQuantity(id) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item))
    );
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  // After checkout is successful
  function clearCart() {
    setItems([]);
  }

  // Added from items so they sync up for the user
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = { items, count, subtotal, addToCart, decreaseQuantity, removeFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
