import { createContext } from "react";
import type { product } from "../data/products";

interface cart {
  id: string;
  quantity: number;
}

interface CardContextType {
  cartItems: cart[];
  addToCart(productId: string): void;
  getCartItemsWithProducts(): product[];
}

export const CartContext = createContext<CardContextType>({
  cartItems: [],
  addToCart: () => {},
  getCartItemsWithProducts: () => {
    return [];
  },
});
