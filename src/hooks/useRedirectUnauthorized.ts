import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";

export default function useRedirectUnauthorized() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.user?.token) {
      navigate("/login");
    }
  }, [user]);
}