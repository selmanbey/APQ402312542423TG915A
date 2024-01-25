import styles from "./Header.module.css";
import Invertocat from "assets/invertocat.png";

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={Invertocat} alt="github logo" className={styles.logo} />
    </div>
  );
};

export default Header;
