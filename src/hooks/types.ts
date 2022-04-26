export interface Country {
  /**
   * the name of the country
   */
  name: string;
  /**
   * the region in which the country is located
   */
  region: string;
  /**
   * the area occupied by the country
   */
  area: string;
}

export interface Filter {
  /**
   * the region of the country
   */
  region?: string;
  /**
   * the area of land occupied by country
   */
  area?: number;
}

export interface Pagination {
  /**
   * the total number of pages
   */
  totalPages?: number;
  /**
   * the current index or page that data should be fetched / shown
   */
  currentPage: number;
  /**
   * the total number of items in the array
   */
  totalItems?: number;
  /**
   * the size of the page, the number of items that should be fetched
   */
  pageSize: number;
}

export enum Sort {
  /**
   * sort for acsending order
   */
  ASC = "asc",
  /**
   * sort for descending order
   */
  DESC = "desc",
}

export enum FetchStatus {
  /**
   * IDLE means the query is in IDLE state and not doing anything
   */
  IDLE = "idle",
  /**
   * FETCHING state denotes the data is being fetched
   */
  FETCHING = "fetching",
  /**
   * FETCHED state denotes the data is fetched and there may or may not be an error
   */
  FETCHED = "fetched",
}
