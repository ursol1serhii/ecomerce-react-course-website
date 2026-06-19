import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { getCartItemsWithProducts } = useContext(CartContext);
  const items = getCartItemsWithProducts();
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {items.map((item) => (
              <div className="checkout-item">
                <img src={item.id}></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
