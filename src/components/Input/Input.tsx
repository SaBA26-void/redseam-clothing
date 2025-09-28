import React, { useCallback } from "react";
import styles from "./Input.module.css";
import Button from "../Button";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  color?: string;
  type?: "text" | "email" | "password";
}

const Input = ({ label, required, type, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPasswordClick = useCallback(() => {
    setShowPassword((showPassword) => !showPassword);
  }, []);

  return (
    <div className={styles.inputWrapper}>
      <div>
        <input placeholder=" " type={showPassword ? "text" : type} {...props} />
        <label>
          <span className={styles.blue}>{label}</span>
          {required && <span className={styles.red}>*</span>}
        </label>
      </div>
      {type === "password" && (
        <Button
          type="button"
          color="White"
          customType="password"
          onClick={handleShowPasswordClick}
        >
          <img src="./passwordIcon.svg" alt="" />
        </Button>
      )}
    </div>
  );
};

export default Input;
