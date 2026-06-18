import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { getProductById } from "../data/products";
import type { product } from "../data/products";

interface ContainerProps {
  children: React.ReactNode;
}

interface cart {
  id: string;
  quantity: number;
}

export default function CartProvider({ children }: ContainerProps) {
  const [cartItems, setCartItems] = useState<cart[]>(() => {
    const currentStore = localStorage.getItem("cart");
    return currentStore ? JSON.parse(currentStore) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  function addToCart(productId: string) {
    // Add the product

    setCartItems((prev) => {
      const isItemCart = prev.some((item) => item.id === productId);
      if (isItemCart) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  }

  function getCartItemsWithProducts(): product[] {
    const currentStore = localStorage.getItem("cart");
    const itemsList = currentStore ? JSON.parse(currentStore) : [];

    return itemsList.map((item: cart) => getProductById(item.id));
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, getCartItemsWithProducts }}
    >
      {children}
    </CartContext.Provider>
  );
}
