import { useContext } from "react";
import {
  fetchCart,
  patchCart,
  removeCartItem,
  type CartItem,
} from "../../data/Cart";
import { CartContext } from "../../contexts/CartContext";

import "./CartItem.scss";

export interface CartItemProps {
  item: CartItem;
}

export default function CartItem(props: CartItemProps) {
  const { item } = props;
  const cartContext = useContext(CartContext);

  const handleChange = (quantity: number) => () => {
    patchCart(item.id, quantity)
      .then(fetchCart)
      .then((cart) => cartContext?.setCart(cart))
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemove = () => {
    removeCartItem(item.id)
      .then(fetchCart)
      .then((cart) => cartContext?.setCart(cart))
      .catch((error) => {
        console.error(error);
      });
  };

  const colorIndex = item.available_colors.indexOf(item.color);

  return (
    <div className="cart-item" key={item.id}>
      <img
        className="cart-item-img"
        src={item.images[colorIndex]}
        alt={item.name}
      />
      <div>
        <div>
          <div className="cart-item-title-wrapper">
            <h4>{item.name}</h4>
            <span>$ {item.total_price}</span>
          </div>
        </div>
        <p className="cart-item-details">{item.color}</p>
        <p className="cart-item-details">{item.size}</p>
        <div className="cart-item-controls">
          <div className="cart-item-quantity">
            <button
              disabled={item.quantity === 1}
              onClick={handleChange(item.quantity - 1)}
            >
              -
            </button>
            {item.quantity}
            <button
              disabled={item.quantity === 5}
              onClick={handleChange(item.quantity + 1)}
            >
              +
            </button>
          </div>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
}
