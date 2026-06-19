import type { product } from "../data/products";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

type ProductCardProps = {
  product: product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { cartItems, addToCart } = useContext(CartContext);
  const productInCart = cartItems.find(
    (item) => item.id === String(product.id),
  );
  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";
  return (
    <div className="product-card">
      <img
        src={product.image}
        className="product-card-image"
        alt={`${product.name}`}
      />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{product.price}</p>
        <div className="product-card-actions">
          <Link className="btn btn-secondary" to={`/products/${product.id}`}>
            View details
          </Link>
          <button
            className="btn btn-primary "
            onClick={() => addToCart(String(product.id))}
          >
            Add to Cart {productQuantityLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
