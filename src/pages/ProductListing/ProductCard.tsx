import { Link } from "react-router";
import type { ListingProduct } from "../../data/Products";

import "./ProductCard.scss";

export interface ProductCardProps {
  product: ListingProduct;
}

export default function ProductCard(props: ProductCardProps) {
  const { name, cover_image, price, id } = props.product;

  return (
    <Link className="product-card" to={`/product/${id}`}>
      <div className="product-card-background">
        <img style={{ maxWidth: "100%" }} src={cover_image} />
      </div>
      <p>{name}</p>
      <p className="product-card-price">$ {price}</p>
    </Link>
  );
}
