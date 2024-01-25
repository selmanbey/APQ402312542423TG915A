import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "components";
import { PAGE } from "modules/repos/consts";
import styles from "./RangeParamInput.module.css";

/**
 * Github API uses * to define an open end in a range:
 * *..* = all values
 * *..30 = up to 30
 * 30..* = from 30 onwards
 *
 * https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-values-between-a-range
 */
const WILDCARD = "*";
const RANGE_SEPARATOR = "..";

const convert = {
  /** Converts url range string to min / max input values ([min, max]) */
  fromUrl: (paramValue: string) => {
    let [paramMin, paramMax] = paramValue.split(RANGE_SEPARATOR);
    if (paramMin === WILDCARD) paramMin = "";
    if (paramMax === WILDCARD) paramMax = "";
    return [paramMin, paramMax];
  },
  /** Converts min / max input values to url param range ("min..max") */
  toUrl: (min: string, max: string) => {
    min = min || WILDCARD;
    max = max || WILDCARD;
    return min + RANGE_SEPARATOR + max;
  },
};

const checkRangeError = (min: string, max: string) => {
  // When either side is undefined / wildcard no range error is possible
  if (!min || !max) {
    return undefined;
  }

  if (parseInt(min) >= parseInt(max)) {
    return "Min value should be lower than max";
  }
};

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
          prevParams.set(PAGE, "1"); // Reset pagination when you trigger a search with an updated range
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
      {label && <label htmlFor={paramName}>{label}</label>}

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
