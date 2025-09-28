import { Link, useNavigate } from "react-router";

import Header from "../../components/Header";
import Button from "../../components/Button";
import Input from "../../components/Input";

import styles from "./Login.module.scss";
import { useCallback, useContext, useEffect, type FormEvent } from "react";
import { postFormData } from "../../data/ApiClient";
import { UserContext } from "../../contexts/UserContext";
import { type AuthResponse } from "../../data/User";

const Registration = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target as HTMLFormElement);

    postFormData<AuthResponse>("/login", formData)
      .then((userData) => {
        if (userContext) {
          userContext.setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          navigate("/products"); // Navigate to product listing page after successful login
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (userContext && userContext.user) {
      navigate("/");
    }
  }, [userContext]);

  return (
    <>
      <Header />
      <div className={styles.content}>
        <img src="./hero.png" alt="hero image" />
        <div className={styles.registrationSection}>
          <h2>Log in</h2>
          <div className={styles.inputsection}>
            <form onSubmit={handleSubmit} className={styles.inputFild}>
              <Input label="Email " name="email" type="email" required />
              <Input
                label="Password "
                name="password"
                type="password"
                required
              />
              <Button type="submit" color="Red-color">
                Log in
              </Button>
              <p className={styles.alreadyMember}>
                <span className={styles.buttonSpan}>Not a member?</span>
                <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
