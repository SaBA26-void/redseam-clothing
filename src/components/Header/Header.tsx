import { useContext, useState } from "react";
import styles from "./Header.module.scss";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router";
import Cart from "../Cart";
import useOutsideClick from "../../hooks/useOutsideClick";

const Header = () => {
  const userContext = useContext(UserContext);
  const [cartOpen, setCartOpen] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setCartOpen(false));

  return (
    <div>
      <div ref={ref}>
        <Cart open={cartOpen} />
      </div>
      <div className={styles.header}>
        <Link to="/">
          <img src="/Logo.svg" alt="logo" />
        </Link>
        {userContext?.user && (
          <div className={styles.headersWrapper}>
            <img
              src="/shopping-cart-dark.svg"
              alt=""
              onClick={() => setCartOpen(!cartOpen)}
            />
            <div className={styles.userProfile}>
              <img
                className={styles.profileImg}
                src={userContext.user.user.avatar || undefined}
                alt="user-img"
              />
              <img src="/chevron-down.svg" alt="chveron-down" />
            </div>
          </div>
        )}
        {!userContext?.user && (
          <Link to="/login" className={styles.loginButton}>
            <img src="/user.svg" alt="avatar" />
            <span>Log in</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
