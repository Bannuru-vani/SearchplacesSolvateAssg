import React from "react";
import "./styles.css";
import "./Spinner";
import Spinner from "./Spinner";
const Table = ({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  places,
  totalCount,
  loading,
  searchText,
}) => {
  console.log(places);
  const handlePageSizeChange = (event) => {
    const pageSizeValue = parseInt(event.target.value);
    if (pageSizeValue > 10) {
      alert('Page size cannot exceed 10');
    } else if (pageSizeValue <= 0) {
      alert('Page size must be greater than 0');
    } else {
      setPageSize(pageSizeValue);
    }
    setCurrentPage(1);
  };


  const handlePageChange = (type) => {
    if (type === "PREVIOUS") {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    } else if (type === "NEXT") {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const getMessage = () => {
    if (!loading && searchText) {
      return "No Data Found";
    } else if (!loading && !searchText) {
      return "Start Searching";
    }
  };

  const hasNextPage = currentPage * pageSize < totalCount;

  console.log(totalCount);
  return (
    <div>
      {loading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <table className="wrapper">
          <thead>
            <tr>
              <th className="wrapper-header">#</th>
              <th className="wrapper-header">Place name</th>
              <th className="wrapper-header">Country</th>
            </tr>
          </thead>
          <tbody>
            {places?.map((row, index) => (
              <tr key={index}>
                <td className="wrapper-data">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>

                <td className="wrapper-data">{row.city}</td>
                <td className="wrapper-data country">
                  {row.country}{" "}
                  <img
                    src={`https://flagsapi.com/${row.countryCode}/flat/32.png`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {places.length === 0 ? (
        <div>
          <p className="message-wrapper">{getMessage()}</p>
        </div>
      ) : (
        <div className="pagination">
          <input
            type="number"
            className="button-wrapper "
            value={pageSize}
            onChange={handlePageSizeChange}
            min="1"
            max="10"
          />
          <button
            className="button-wrapper button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange("PREVIOUS")}
          >
            Previous
          </button>

          <p>{currentPage}</p>
          <button
            className="button-wrapper button"
            disabled={!hasNextPage}
            onClick={() => handlePageChange("NEXT")}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
