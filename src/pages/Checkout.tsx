import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { getCartItemsWithProducts, removeItemFromCart } =
    useContext(CartContext);
  const items = getCartItemsWithProducts();

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>

            {items.map((item) => (
              // Добавили обязательный key для React, чтобы не было варнингов
              <div className="checkout-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name} // Убрал лишние кавычки "item.name" -> item.name
                  className="checkout-item-image"
                />
                <div className="checkout-item-details">
                  <h3 className="checkout-item-name">{item.name}</h3>
                  <p className="checkout-item-price">{item.price}</p>
                </div>
                <div className="checkout-item-controls">
                  <div className="quantity-controls">
                    <button className="quantity-btn">-</button>
                    <span className="quantity-values">{item.quantity}</span>
                    <button className="quantity-btn">+</button>
                  </div>
                  <p className="checkout-item-total">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
