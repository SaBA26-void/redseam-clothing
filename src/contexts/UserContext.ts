import { createContext } from "react";

import type { AuthResponse } from "../data/User";

interface UserContext {
  user: AuthResponse | null;
  setUser: (user: AuthResponse | null) => void;
}

export const UserContext = createContext<UserContext | undefined>(undefined);
