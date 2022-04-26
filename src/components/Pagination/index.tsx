import { Pagination } from "../../hooks/types";

interface PaginationComponentProps {
  /**
   * the pagination object to render the pagination buttons
   */
  pagination: Pagination;
  /**
   * the functionality to handle pagination, takes a number current page index to send to the pagination object 
   */
  handleClick: (index: number) => void;
}

const PaginationComponent = (props: PaginationComponentProps) => {
  const {
    pagination: { currentPage, totalPages },
    handleClick,
  } = props;
  return (
    <div className="pagination-container">
      {Array.from(Array(totalPages), (_, index) => {
        const page = index + 1;
        return (
          <button
            key={index}
            className={page === currentPage ? "button-selected" : ""}
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default PaginationComponent;
