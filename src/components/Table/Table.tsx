import { FC, HTMLProps, PropsWithChildren } from "react";
import styles from "./Table.module.css";

export const TD: FC<PropsWithChildren & HTMLProps<HTMLTableCellElement>> = ({
  children,
  ...props
}) => {
  return (
    <td className={styles.data} {...props}>
      {children}
    </td>
  );
};

export const TH: FC<
  PropsWithChildren &
    HTMLProps<HTMLTableCellElement> & {
      sortable?: boolean;
      sorted?: "asc" | "desc" | null;
    }
> = ({ children, sortable = false, sorted, ...props }) => {
  let arrowClasses = sorted
    ? [styles.arrow, styles[`arrow-${sorted}`], styles["sticky-arrow"]]
    : [styles.arrow];

  if (!sortable) {
    arrowClasses = [];
  }

  return (
    <th {...props} className={styles.header}>
      {children}
      <div className={arrowClasses.join(" ")} />
    </th>
  );
};

export const TR: FC<PropsWithChildren & HTMLProps<HTMLTableRowElement>> = ({
  children,
  ...props
}) => {
  return (
    <tr className={styles.row} {...props}>
      {children}
    </tr>
  );
};

const Table: FC<PropsWithChildren & HTMLProps<HTMLTableElement>> = ({
  children,
  ...props
}) => {
  return (
    <table className={styles.table} {...props}>
      {children}
    </table>
  );
};

export default Table;
