import "./App.css";
import { useState } from "react";
import { Filter, Sort, Pagination } from "./hooks/types";
import useCountriesFetch from "./hooks/useCountriesFetch";
import Countries from "./components/Countries";
import PaginationComponent from "./components/Pagination";

const App = () => {
  const [filter, setFilter] = useState<Filter | undefined>(undefined);
  const [sort, setSort] = useState<Sort | undefined>(undefined);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    pageSize: 10,
  });
  const { data, isLoading, isError, pageParams } = useCountriesFetch({
    url: "https://restcountries.com/v2/all?fields=name,region,area",
    sort,
    filter,
    pageParams: pagination,
  });

  // to handle the filter for data
  const handleFilter = (filterData: Filter) => {
    setFilter((current) => ({
      ...current,
      ...filterData,
    }));
  };

  // to handle sorting of the data, there are three states (unsorted or undefined), ascending sort, descending sort
  const handleSort = () => {
    if (sort === undefined) {
      setSort(Sort.ASC);
    } else if (sort === Sort.ASC) {
      setSort(Sort.DESC);
    } else {
      setSort(undefined);
    }
  };

  // to handle pagination of the data
  const handlePagination = (page: number, pageSize: number = 10) => {
    setPagination((current) => ({
      ...current,
      pageSize,
      currentPage: page,
    }));
  };

  return (
    <div className="App">
      <h2>Rest Countries</h2>
      <Countries
        sort={sort}
        filter={filter}
        countries={data}
        isLoading={isLoading}
        errorMessage={isError}
        handleSort={handleSort}
        handleFilter={handleFilter}
      />
      <PaginationComponent
        pagination={{
          ...pagination,
          currentPage: pageParams.currentPage,
          totalItems: pageParams.totalItems,
          totalPages: pageParams.totalPages,
        }}
        handleClick={handlePagination}
      />
    </div>
  );
};

export default App;
