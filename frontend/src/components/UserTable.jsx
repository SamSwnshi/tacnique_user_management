import React from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const UserTable = ({ users, onSort, sortColumn, sortDirection, onEdit, onDelete }) => {
    console.log("Data from UserTable",users)
     const getSortIndicator = (column) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };
  return (
   <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('id')}
            >
              ID {getSortIndicator('id')}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('name')}
            >
              Name {getSortIndicator('name')}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('email')}
            >
              Email {getSortIndicator('email')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.company?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex">
                <button
                  onClick={() => onEdit(user.id)}
                  className="text-blue-600 hover:text-blue-900 hover:scale-110 duration-100 mr-4 flex items-center gap-2"
                >
                  Edit <span><MdEdit /></span>
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-600 hover:text-red-900 hover:scale-110 duration-100 flex items-center gap-2"
                >
                  Delete <span><MdDelete /></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default UserTable
