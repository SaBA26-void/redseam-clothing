import { useContext, useEffect, useMemo } from "react";
import styles from "./Cart.module.scss";
import { CartContext } from "../../contexts/CartContext";
import { fetchCart } from "../../data/Cart";
import CartItem from "./CartItem";

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

  const itemsSubtotal = useMemo(() => {
    return cartContext?.cart?.reduce(
      (prev, current) => prev + current.total_price,
      0
    );
  }, [cartContext?.cart]);

  return (
    <div className={styles.cart}>
      <h3>Shopping cart ({cartContext?.cart?.length})</h3>
      <div>
        {cartContext?.cart?.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      <div>
        <div>
          <span>Items subtotal</span>
          <span>$ {itemsSubtotal}</span>
        </div>
        <div>
          <span>Delivery</span>
          <span>$ 5</span>
        </div>
        <div>
          <span>Total</span>
          <span>$ {(itemsSubtotal || 0) + 5}</span>
        </div>
      </div>
    </div>
  );
}
