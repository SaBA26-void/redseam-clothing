import { createContext } from "react";
import type { CartItem } from "../data/Cart";

interface CartContext {
  cart: CartItem[] | null;
  setCart: (user: CartItem[] | null) => void;
}

export const CartContext = createContext<CartContext | undefined>(undefined);
