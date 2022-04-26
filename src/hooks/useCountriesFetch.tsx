import { useState, useEffect, useMemo } from "react";
import { Country, FetchStatus, Sort, Filter, Pagination } from "./types";
import { processData, isObjectEmpty, paginate } from "./utils";

interface UseFetchResult {
  /**
   * the status of the Promise / fetch API can be IDLE, FETCHING, FETCHED
   */
  status: FetchStatus;
  /**
   * the hook has no data and is currently fetching the data
   */
  isLoading: boolean;
  /**
   * the data that the hooks fetches and processes
   */
  data: Country[];
  /**
   * Fetching is completed but an error was encountered
   */
  isError: string;
  /**
   * the object for pagination
   */
  pageParams: Pagination;
}

interface UseFetchParams {
  /**
   * the url from where the data is to be fetched
   */
  url: string;
  /**
   * to sort the data returned by the hook, ascending or descending
   */
  sort?: Sort;
  /**
   * to apply filters for region, area or both on the data
   */
  filter?: Filter;
  /**
   * for pagination of the data returned by the hook
   */
  pageParams: Pagination;
}

const useCountriesFetch = ({
  url,
  sort,
  filter,
  pageParams,
}: UseFetchParams): UseFetchResult => {
  const [pagination, setPagination] = useState<Pagination>(pageParams);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsErrror] = useState<string>("");
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Country[]>([]);
  const isFilterApplied = useMemo(() => !isObjectEmpty(filter), [filter]);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setStatus(FetchStatus.FETCHING);
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const result: Country[] = await response.json();
        let rawData = result;
        if (sort || isFilterApplied) {
          rawData = processData({ data: result, sort, filter });
        }
        const paginatedData = paginate({ data: rawData, pageParams });
        const totalPages = Math.ceil(rawData.length / pageParams.pageSize);
        // when filter is applied the total number of pages may change so added check if the current page is within the range of pages
        const isCurrentPageInRange = pageParams.currentPage <= totalPages;
        setPagination((current) => ({
          ...current,
          ...pageParams,
          currentPage: isCurrentPageInRange ? pageParams.currentPage : 1,
          totalPages,
          totalItems: rawData.length,
        }));
        setData(paginatedData);
        setIsLoading(false);
        setStatus(FetchStatus.FETCHED);
      } catch (error) {
        setIsLoading(false);
        setStatus(FetchStatus.FETCHED);
        setIsErrror((error as Error).message);
      }
    };

    fetchData();
  }, [
    url,
    sort,
    isFilterApplied,
    filter?.area,
    filter?.region,
    pageParams,
    filter,
    pageParams.currentPage,
    pageParams.pageSize,
  ]);

  return { status, data, isLoading, isError, pageParams: pagination };
};

export default useCountriesFetch;
