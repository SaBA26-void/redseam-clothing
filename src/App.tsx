import { Routes, Route } from "react-router";

import ProductListing from "./pages/ProductListing";

import "./App.css";
import Registration from "./pages/Registration";
import { useEffect, useState } from "react";
import { type AuthResponse } from "./data/User";

import { UserContext } from "./contexts/UserContext";

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
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
