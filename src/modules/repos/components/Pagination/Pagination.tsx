import { FC } from "react";
import { Button } from "components";
import { useSearchParams } from "react-router-dom";
import { PAGE } from "modules/repos/consts";
import styles from "./Pagination.module.css";

interface Props {
  pages?: number; // Number of total pages
}

const Pagination: FC<Props> = ({ pages = 1 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get(PAGE) || "1", 10);

  const goToPrevPage = () => {
    if (currentPage > 1)
      setSearchParams((prevParams) => {
        prevParams.set(PAGE, (currentPage - 1).toString());
        return prevParams;
      });
  };

  const goToNextPage = () => {
    if (currentPage < pages)
      setSearchParams((prevParams) => {
        prevParams.set(PAGE, (currentPage + 1).toString());
        return prevParams;
      });
  };

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.button}
        onClick={goToPrevPage}
        disabled={currentPage === 1}
      >
        ◀︎
      </Button>
      <span className={styles.pageInfo}>
        {currentPage} / {pages}
      </span>
      <Button
        className={styles.button}
        onClick={goToNextPage}
        disabled={currentPage === pages}
      >
        ▶
      </Button>
    </div>
  );
};

export default Pagination;
