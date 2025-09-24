import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, onLimitChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex space-x-1">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => onPageChange(number)} className={`px-4 py-2 rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            {number}
          </button>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">Items per page:</span>
        <select onChange={(e) => onLimitChange(Number(e.target.value))} value={itemsPerPage} className="px-2 py-1 rounded-md border">
          <option value="10">5</option>
          <option value="25">15</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;