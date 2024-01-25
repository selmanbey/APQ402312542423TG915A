import { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface Props {
  error?: string;
}

const Input: React.FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({
  error,
  className,
  ...props
}) => {
  const classes = [styles.input, className];
  if (error) {
    classes.push(styles.inputError);
  }

  return (
    <div className={styles.inputWrapper}>
      <input className={classes.join(" ")} {...props} />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
