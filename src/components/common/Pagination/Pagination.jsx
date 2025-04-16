import React from "react";
import { usePagination, DOTS } from "../hooks/usePagination";
import "./Pagination.css";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <>
      <div className="pagination-container">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={onPrevious}
        >
          <div>{"<"}</div>
        </button>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <li key={index}>&#8230;</li>;
          }

          return (
            <button
              key={index}
              className={`pagination-button ${
                pageNumber === currentPage ? "active" : ""
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="pagination-button"
          disabled={currentPage === lastPage}
          onClick={onNext}
        >
          <div>{">"}</div>
        </button>
      </div>
    </>
  );
};

export default Pagination;
