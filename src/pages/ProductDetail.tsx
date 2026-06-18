import { useParams, Navigate } from "react-router-dom";
import { getProductById } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <Navigate to="/" replace />;
  }
  const product = getProductById(id);

  if (!product) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">Price: ${product.price}</p>
            <p className="product-detail-description">
              Description: ${product.description}
            </p>

            <button className="btn btn-primary">Add to Card</button>
          </div>
        </div>
      </div>
    </div>
  );
}
