/**
 * Github API uses * to define an open end in a range:
 * *..* = all values
 * *..30 = up to 30
 * 30..* = from 30 onwards
 *
 * https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-values-between-a-range
 */
export const WILDCARD = "*";
export const RANGE_SEPARATOR = "..";

export const convert = {
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

export const checkRangeError = (min: string, max: string) => {
  // When either side is undefined / wildcard no range error is possible
  if (!min || !max) {
    return undefined;
  }

  if (parseInt(min) >= parseInt(max)) {
    return "Min value should be lower than max";
  }
};
