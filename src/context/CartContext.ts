import { createContext } from "react";
import type { product } from "../data/products";

interface cart {
  id: string;
  quantity: number;
}

interface CartItems extends product {
  quantity: number;
}

interface CardContextType {
  cartItems: cart[];
  addToCart(productId: string): void;
  getCartItemsWithProducts(): CartItems[];
  removeItemFromCart(id: string): void;
}

export const CartContext = createContext<CardContextType>({
  cartItems: [],
  addToCart: () => {},
  getCartItemsWithProducts: () => {
    return [];
  },
  removeItemFromCart: () => {},
});
