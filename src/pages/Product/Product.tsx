import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Header from "../../components/Header";
import { fetchProductById, type ListingProduct } from "../../data/Products";
import Button from "../../components/Button";
import { addToCart, fetchCart } from "../../data/Cart";
import { CartContext } from "../../contexts/CartContext";

import "./Product.scss";
import useRedirectUnauthorized from "../../hooks/useRedirectUnauthorized";

export default function Product() {
  const { id } = useParams();
  const cartContext = useContext(CartContext);

  const [product, setProduct] = useState<ListingProduct | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useRedirectUnauthorized();

  useEffect(() => {
    fetchProductById(Number(id))
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;

    addToCart(
      Number(product.id),
      quantity,
      product.available_sizes[selectedSize],
      product.available_colors[selectedColor]
    )
      .then(fetchCart)
      .then((cart) => cartContext?.setCart(cart))
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  }, [product, selectedColor, selectedSize, quantity]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <Header />
      <div className="product-page-link">
        <Link to="/products">Listing</Link>
        <span> / </span>
        <span>Product</span>
      </div>
      <main className="product-page-wrapper">
        <div className="product-page-images-wrapper">
          <div className="product-page-catalog-image">
            {product.images.map((image, key) => (
              <img
                key={image}
                src={image}
                alt={`${product.name} ${product.available_colors[key]}`}
              />
            ))}
          </div>
          <div className="product-page-main-image">
            <img src={product.images[selectedColor]} alt={product.name} />
          </div>
        </div>
        <div>
          <h1 className="product-page-name">{product.name}</h1>
          <p className="product-page-price">$ {product.price}</p>
          <div className="product-page-options">
            <p className="product-page-options-label">
              Color: {product.available_colors[selectedColor]}
            </p>
            <div className="product-page-options-list">
              {product.available_colors.map((color, key) => (
                <span
                  className={`product-page-options-color ${
                    color === product.available_colors[selectedColor]
                      ? "product-page-options-color--active"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  key={color}
                  onClick={() => setSelectedColor(key)}
                ></span>
              ))}
            </div>
          </div>
          <div className="product-page-options">
            <p className="product-page-options-label">
              Size: {product.available_sizes[selectedSize]}
            </p>
            <div className="product-page-options-list">
              {product.available_sizes.map((size, key) => (
                <span
                  className={`product-page-options-size ${
                    size === product.available_sizes[selectedSize]
                      ? "product-page-options-size--active"
                      : ""
                  }`}
                  key={size}
                  onClick={() => setSelectedSize(key)}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
          <div className="product-page-options">
            <div>
              <label htmlFor="quantity" className="product-page-options-label">
                Quantity
              </label>
            </div>
            <div className="product-page-quantity">
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                <option value="1" selected={quantity === 1}>
                  1
                </option>
                <option value="2" selected={quantity === 2}>
                  2
                </option>
                <option value="3" selected={quantity === 3}>
                  3
                </option>
                <option value="4" selected={quantity === 4}>
                  4
                </option>
                <option value="5" selected={quantity === 5}>
                  5
                </option>
              </select>
            </div>
          </div>
          <div className="product-page-div-button">
            <Button type="button" onClick={handleAddToCart}>
              <img src="\public\shopping-cart.svg" alt="" />
              Add to cart
            </Button>
          </div>
          <hr />
          <div className="product-page-details-div">
            <div className="product-page-details-div-wrapper">
              <h2>Details</h2>
              <img
                className="product-page-details-div-wrapper-img"
                src={product.brand.image}
                alt={product.brand.name}
              />
            </div>
            <p className="product-page-details-div-ptag">
              Brand: {product.brand.name}
            </p>
            <p className="product-page-details-div-ptag">
              {product.description}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
