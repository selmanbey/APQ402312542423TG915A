import { FC } from "react";
import styles from "./NoResults.module.css";

interface Props {
  message: string;
}

const NoResults: FC<Props> = ({ message }) => {
  return (
    <div className={styles.noResults}>
      <p>{message}</p>
    </div>
  );
};

export default NoResults;
