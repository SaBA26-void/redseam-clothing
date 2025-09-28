import { useContext, useMemo } from "react";
import { CartContext } from "../../contexts/CartContext";

import "./CartTotals.scss";

export default function CartTotals() {
  const cartContext = useContext(CartContext);

  const itemsSubtotal = useMemo(() => {
    return cartContext?.cart?.reduce(
      (prev, current) => prev + current.total_price,
      0
    );
  }, [cartContext?.cart]);

  return (
    <div className="cart-totals">
      <div>
        <span>Items subtotal</span>
        <span>$ {itemsSubtotal}</span>
      </div>
      <div>
        <span>Delivery</span>
        <span>$ 5</span>
      </div>
      <div className="cart-totals-total">
        <span>Total</span>
        <span>$ {(itemsSubtotal || 0) + 5}</span>
      </div>
    </div>
  );
}
