import styles from "./Error.module.css";

interface ErrorProps {
  message: string;
  onClose: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onClose }) => {
  return (
    <div className={styles.errorDialog}>
      <p>{message}</p>
      <button onClick={onClose}>✖︎</button>
    </div>
  );
};

export default Error;
