import React from 'react';

const FilterPopup = ({ onFilter, onClose }) => {
  const handleApply = (e) => {
    onFilter(e.target.value);
    onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-2 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80 border border-gray-200">
        <h3 className="text-lg font-bold mb-4">Filter By</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Filter:</label>
          <select
            onChange={handleApply}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">- Choose Option -</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="department">Department</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;