import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<Props> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const classes = [styles.button, styles[variant], className];

  return <button className={classes.join(" ")} {...props} />;
};

export default Button;
