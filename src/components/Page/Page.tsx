import { FC, PropsWithChildren } from "react";
import Header from "components/Header/Header";
import styles from "./Page.module.css";

const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Page;
