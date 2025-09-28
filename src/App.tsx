import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

import { type AuthResponse } from "./data/User";
import { UserContext } from "./contexts/UserContext";
import ProductListing from "./pages/ProductListing";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const [user, setUser] = useState<AuthResponse | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData) as AuthResponse);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route index element={<ProductListing />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
