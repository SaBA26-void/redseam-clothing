import { useContext } from "react";
import {
  fetchCart,
  patchCart,
  removeCartItem,
  type CartItem,
} from "../../data/Cart";
import styles from "./Cart.module.scss";
import { CartContext } from "../../contexts/CartContext";

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
    <div className={styles.item} key={item.id}>
      <img
        className={styles.itemImage}
        src={item.images[colorIndex]}
        alt={item.name}
      />
      <div>
        <span>{item.name}</span>
        <span>
          {item.quantity} x ${item.price}
        </span>
      </div>
      <span>${item.total_price}</span>
      <span>{item.color}</span>
      <span>{item.size}</span>
      <div>
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
  );
}
