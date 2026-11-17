// Any Component -> const {items.addToCart} =useCart()
import { useContext } from "react";
import { CartContext } from "./CartContext";

export function useCart() {
  return useContext(CartContext);
}
