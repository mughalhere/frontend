import { Sort } from "../../hooks/types";

/**
 *
 * @param sort the sort that is currently applied could be undefined | ascending | descending
 * @returns the corresponding text based on the current sort value that should be shown
 */
export const sortDictionary = (sort: Sort | undefined) => {
  if (sort === undefined) {
    return "None";
  } else if (sort === Sort.ASC) {
    return "Asc";
  } else {
    return "Desc";
  }
};
