import { useMemo } from "react";
import { Country, Sort, Filter } from "../../hooks/types";
import { sortDictionary } from "./dictionary";

interface CountriesProps {
  /**
   * the sorting that is applied on the data
   */
  sort: Sort | undefined;
  /**
   * the filter that is applied on the data
   */
  filter: Filter | undefined;
  /**
   * if the data is currently loading
   */
  isLoading: boolean;
  /**
   * array of countries that table is to be shown
   */
  countries: Country[];
  /**
   * if an error occurred while fetching data, the error details
   */
  errorMessage: string;
  /**
   * to handle the sorting of the data when sort button is clicked
   */
  handleSort: VoidFunction;
  /**
   * to handle the filters of data region, area or both
   */
  handleFilter: (filterData: Filter) => void;
}

const Countries = (props: CountriesProps) => {
  const {
    isLoading,
    errorMessage,
    countries,
    handleSort,
    sort,
    filter,
    handleFilter,
  } = props;

  if (isLoading) {
    return (
      <div className="countries-container">
        <div className="text-center">I am loading</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="countries-container">
        <div className=" text-center">
          {errorMessage ?? "Something went wrong"}
        </div>
      </div>
    );
  }

  return (
    <div className="countries-container">
      <div>
        <label htmlFor="area-filter">
          Filter Countries smaller than Lithuania by area
        </label>
        <input
          id="area-filter"
          type="checkbox"
          checked={!!filter?.area}
          onChange={() =>
            handleFilter({ area: filter?.area ? undefined : 65300 })
          }
        />
      </div>
      <div>
        <label htmlFor="region-filter">
          Filter Countries in Oceania Region
        </label>
        <input
          id="region-filter"
          type="checkbox"
          checked={!!filter?.region}
          onChange={() =>
            handleFilter({ region: filter?.region ? undefined : "Oceania" })
          }
        />
      </div>
      <table>
        <thead>
          <tr>
            <td>
              <h4>
                Sort <SortButton sort={sort} handleSort={handleSort} />
              </h4>
            </td>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.name}>
              <td>
                <p>{country.name}</p>
                <p>{country.region}</p>
                <p>{country.area}</p>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default Countries;

const SortButton = ({
  sort,
  handleSort,
}: {
  sort: Sort | undefined;
  handleSort: VoidFunction;
}) => {
  const buttonText = useMemo(() => sortDictionary(sort), [sort]);
  return <button onClick={handleSort}>{buttonText}</button>;
};
