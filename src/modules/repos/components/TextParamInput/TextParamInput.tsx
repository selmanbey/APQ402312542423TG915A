import Input from "components/Input/Input";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./TextParamInput.module.css";

interface Props {
  paramName: string;
  label?: string;
  placeholder?: string;
}

const TextParamInput: React.FC<Props> = ({
  paramName,
  label,
  placeholder = "",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(paramName) || "";

  const [value, setValue] = useState<string>(paramValue || "");

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchParams((prevParams) => {
        const prevValue = prevParams.get(paramName);
        if (value !== prevValue) {
          prevParams.set(paramName, value);
        }

        return prevParams;
      });
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [paramName, value, setSearchParams]);

  return (
    <div className={styles.textParamInput}>
      {label && <label htmlFor={paramName}>{label}</label>}
      <Input
        type="text"
        id={paramName}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextParamInput;
