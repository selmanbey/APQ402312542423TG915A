import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "components";
import styles from "./RangeParamInput.module.css";
import { RANGE_SEPARATOR, convert, checkRangeError } from "./utils";

interface Props {
  paramName: string;
  label?: string;
  placeholder?: string;
}

const RangeParamInput: React.FC<Props> = ({ paramName, label }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramValue = searchParams.get(paramName) || RANGE_SEPARATOR;
  const [paramMin, paramMax] = convert.fromUrl(paramValue);

  const [minValue, setMinValue] = useState<string>(paramMin);
  const [maxValue, setMaxValue] = useState<string>(paramMax);

  const [rangeError, setRangeError] = useState<string | undefined>(undefined);

  const validateMinValue = (value: string) => {
    setRangeError(checkRangeError(value, maxValue));
    setMinValue(value);
  };

  const validateMaxValue = (value: string) => {
    setRangeError(checkRangeError(minValue, value));
    setMaxValue(value);
  };

  useEffect(() => {
    // Don't update search parameters while there is a range error
    if (rangeError) return;

    // Url params are always given values or wildcards
    const range = convert.toUrl(minValue, maxValue);

    const debounce = setTimeout(() => {
      setSearchParams((prevParams) => {
        const currentRange = prevParams.get(paramName);
        if (range !== currentRange) {
          prevParams.set(paramName, range);
        }
        return prevParams;
      });
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [paramName, minValue, maxValue, setSearchParams, rangeError]);

  return (
    <div className={styles.rangeParamInput}>
      {label && <label htmlFor={`${paramName}-min`}>{label}</label>}

      <Input
        type="number"
        id={`${paramName}-min`}
        placeholder="min"
        value={minValue}
        onChange={(e) => validateMinValue(e.target.value)}
        error={rangeError}
      />

      <p>-</p>

      <Input
        className={styles.textParamInput}
        type="number"
        id={`${paramName}-max`}
        placeholder="max"
        value={maxValue}
        onChange={(e) => validateMaxValue(e.target.value)}
      />
    </div>
  );
};

export default RangeParamInput;
