import type { product } from "../data/products";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} className="product-card-image" />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{product.price}</p>
        <div className="product-card-actions">
          <Link className="btn btn-secondary" to="/checkout">
            View details
          </Link>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
