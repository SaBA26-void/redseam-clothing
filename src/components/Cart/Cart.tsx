import { useContext, useEffect } from "react";
import "./Cart.scss";
import { CartContext } from "../../contexts/CartContext";
import { fetchCart } from "../../data/Cart";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import { Link } from "react-router";

export interface CartProps {
  open?: boolean;
}

export default function Cart(props: CartProps) {
  const { open } = props;
  const cartContext = useContext(CartContext);

  useEffect(() => {
    fetchCart()
      .then((cart) => cartContext?.setCart(cart))
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className="shopping-cart">
      <div>
        <h3 className="shopping-cart-heading">
          Shopping cart ({cartContext?.cart?.length})
        </h3>
        <div className="shopping-cart-item">
          {cartContext?.cart?.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
      </div>
      <div>
        <CartTotals />
        <div className="shopping-cart-cta">
          <Link to="/checkout">Go to checkout</Link>
        </div>
      </div>
    </div>
  );
}
