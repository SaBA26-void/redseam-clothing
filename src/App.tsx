import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

import { type AuthResponse } from "./data/User";
import { type CartItem } from "./data/Cart";
import { UserContext } from "./contexts/UserContext";
import ProductListing from "./pages/ProductListing";
import Registration from "./pages/Registration";
import Product from "./pages/Product";
import Login from "./pages/Login";

import "./App.css";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [cart, setCart] = useState<CartItem[] | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData) as AuthResponse);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Routes>
          <Route index element={<ProductListing />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
