import { Link, useParams } from "react-router";
import "./Product.module.scss";
import Header from "../../components/Header";
import { useCallback, useContext, useEffect, useState } from "react";
import { fetchProductById, type ListingProduct } from "../../data/Products";
import Button from "../../components/Button";
import { addToCart, fetchCart } from "../../data/Cart";
import { CartContext } from "../../contexts/CartContext";

export default function Product() {
  const { id } = useParams();
  const cartContext = useContext(CartContext);

  const [product, setProduct] = useState<ListingProduct | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

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
    <div>
      <Header />
      <div>
        <Link to="/">Listing</Link>
        <span> / </span>
        <span>Product</span>
      </div>
      <main>
        <div>
          <div>
            {product.images.map((image, key) => (
              <img
                key={image}
                src={image}
                alt={`${product.name} ${product.available_colors[key]}`}
              />
            ))}
          </div>
          <div>
            <img src={product.images[selectedColor]} alt={product.name} />
          </div>
        </div>
        <div>
          <h1>{product.name}</h1>
          <p>$ {product.price}</p>
          <div>
            <p>Color: {product.available_colors[selectedColor]}</p>
            <div>
              {product.available_colors.map((color, key) => (
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: color,
                    display: "inline-block",
                    borderRadius: "10px",
                    border:
                      key === selectedColor
                        ? "1px solid red"
                        : "1px solid gray",
                  }}
                  key={color}
                  onClick={() => setSelectedColor(key)}
                ></span>
              ))}
            </div>
          </div>
          <div>
            <p>Size: {product.available_sizes[selectedSize]}</p>
            <div>
              {product.available_sizes.map((size, key) => (
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "inline-block",
                    borderRadius: "10px",
                    border:
                      key === selectedSize ? "1px solid red" : "1px solid gray",
                  }}
                  key={size}
                  onClick={() => setSelectedSize(key)}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
          <div>
            <select
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
          <div>
            <Button type="button" onClick={handleAddToCart}>
              Add to cart
            </Button>
          </div>
          <div>
            <h2>Details</h2>
            <img src={product.brand.image} alt={product.brand.name} />
            <p>Brand: {product.brand.name}</p>
            <p>{product.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
