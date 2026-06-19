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

interface CartItems extends product {
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

  function getCartItemsWithProducts(): CartItems[] {
    return cartItems
      .map((item: cart) => {
        const product = getProductById(item.id);

        if (!product) return null;

        return { ...product, quantity: item.quantity };
      })
      .filter((item): item is CartItems => item !== null);
  }

  const removeItemFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item: cart) => item.id !== id);
    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProducts,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
