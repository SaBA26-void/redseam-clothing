import React, { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isLogin, setLogin] = useState(true);

  return (
    <div className={styles.header}>
      <img src="./Logo.svg" alt="logo" />
      {isLogin === true && (
        <div className={styles.headersWrapper}>
          <img src="./shopping-cart-dark.svg" alt="" />
          <div className={styles.userProfile}>
            <img
              className={styles.profileImg}
              src="./და გოგია.jpg"
              alt="user-img"
            />
            <img src="./chevron-down.svg" alt="chveron-down" />
          </div>
        </div>
      )}
      {isLogin === false && <img src="./login-avatar-dark.svg" alt="avatar" />}
    </div>
  );
};

export default Header;
