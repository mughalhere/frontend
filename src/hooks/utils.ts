import { Country, Sort, Filter, Pagination } from "./types";

/**
 *
 * @param data takes the array of data of countries to sort
 * @param sort the sort order for data provided ascending or descending
 * @returns the sorted data based on the sort parameter
 */
export const handleSort = (data: Country[], sort: Sort): Country[] => {
  return data.sort((currentValue, nextValue) => {
    const currentName = currentValue.name.toLowerCase();
    const nextName = nextValue.name.toLocaleLowerCase();
    if (currentName < nextName) {
      return sort === Sort.ASC ? -1 : 1;
    }
    if (currentName > nextName) {
      return sort === Sort.ASC ? 1 : -1;
    }
    return 0;
  });
};

/**
 *
 * @param data takes the array of data of countries to filter
 * @param filter applies the filter based on region or area
 * @returns the filtered array of countries based on region or area or both
 */
const handleFilter = (data: Country[], filter: Filter): Country[] => {
  let result = data;
  const { area, region } = filter;

  if (region) {
    result = result.filter((country) => country.region === region);
  }
  if (area) {
    result = result.filter((country) => Number(country.area) < area);
  }
  return result;
};

/**
 *
 * @param takes an object of data, sort, filter objects to process data
 * @returns the sorted, filtered, both or none data based on the values provided for Filter and Sort
 */
export const processData = ({
  data,
  sort,
  filter,
}: {
  data: Country[];
  sort?: Sort;
  filter?: Filter;
}): Country[] => {
  let result: Country[] = [];
  if (sort) {
    result = handleSort(data, sort);
  }
  if (filter?.area || filter?.region) {
    result = handleFilter(data, filter);
  }

  return result.length ? result : data;
};

/**
 *
 * @param obj takes an JS object and checks if it is empty or not
 * @returns true if the object is empty e.g {} else returns false if the object has one or more key, value pairs
 */
export const isObjectEmpty = <PropType>(obj: PropType) => {
  return Object.entries(obj ?? {}).length === 0;
};

/**
 *
 * @param takes an object of data of array of countries and params for pagination
 * @returns the paginated array of countries based on the page params provided of size and current page
 */
export const paginate = ({
  data,
  pageParams,
}: {
  data: Country[];
  pageParams: Pagination;
}): Country[] => {
  const { currentPage, pageSize } = pageParams;
  const range = Math.ceil(data.length / pageParams.pageSize);
  const isCurrentPageInRange = currentPage <= range;
  const pageIndex = isCurrentPageInRange ? currentPage - 1 : 1;

  const first = pageIndex * pageSize;
  const last = pageIndex * pageSize + pageSize;
  return data.filter((_, index) => {
    return first <= index && index < last;
  });
};
