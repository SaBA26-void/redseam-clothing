import { type ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProprs {
  type: "button" | "submit" | "reset";
  customType?: "password";
  children?: ReactNode;
  color?:
    | "Red-color"
    | "Dark-blue"
    | "Dark-blue-2"
    | "White"
    | "Grey"
    | "White-2";
  onClick?: () => void;
  className?: string;
}

const Button = ({
  type = "button",
  customType,
  children,
  color = "Red-color",
  onClick,
  className,
}: ButtonProprs) => {
  const classNames = [
    styles.btn,
    styles[`btn--${color}`],
    customType === "password" ? styles.passwordButton : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      type={type}
      className={`${classNames} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
