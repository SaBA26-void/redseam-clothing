import { Link, useNavigate } from "react-router";

import Header from "../../components/Header";
import Button from "../../components/Button";
import Input from "../../components/Input";

import styles from "./Registration.module.scss";
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

    postFormData<AuthResponse>("/register", formData)
      .then((userData) => {
        if (userContext) {
          userContext.setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
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
          <h2>Registration</h2>
          <div className={styles.userImguploadsection}>
            <img
              className={styles.profileImg}
              src="./და გოგია.jpg"
              alt="user"
            />
            <Button
              type="button"
              color="White"
              onClick={() => console.log("Upload clicked")}
            >
              Upload new
            </Button>
            <Button
              type="button"
              color="White"
              onClick={() => console.log("Upload clicked")}
            >
              Remove
            </Button>
          </div>
          <div className={styles.inputsection}>
            <form onSubmit={handleSubmit} className={styles.inputFild}>
              <Input label="Username " name="username" type="text" required />
              <Input label="Email " name="email" type="email" required />
              <Input
                label="Password "
                name="password"
                type="password"
                required
              />
              <Input
                label="Confirm Password "
                name="password_confirmation"
                type="password"
                required
              />
              <Button type="submit" color="Red-color">
                Register
              </Button>
              <p className={styles.alreadyMember}>
                <span className={styles.buttonSpan}>Already member?</span>
                <Link to="/login">Log in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
