import React, { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../service/api";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";

const Home = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState('name');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getUsers();
        setAllUsers(response.data);
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (location.state?.newUser) {
      const newUser = location.state.newUser;
      setAllUsers((prevUsers) => [...prevUsers, newUser]);
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.newUser]);

  useEffect(() => {
    let filterAndSort = [...allUsers];
    if (searchTerm) {
      filterAndSort = filterAndSort.filter(user => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        switch (activeFilter) {
          case 'name':
            return user.name.toLowerCase().includes(lowerCaseSearchTerm);
          case 'email':
            return user.email.toLowerCase().includes(lowerCaseSearchTerm);
          case 'department':
            return user.company?.name?.toLowerCase().includes(lowerCaseSearchTerm);
          default:
            return (
              user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
              user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
              user.company?.name?.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }
      });
    }

    if (sortColumn) {
      filterAndSort.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    setUsers(filterAndSort);
    setCurrentPage(1);
  }, [allUsers, searchTerm, activeFilter, sortColumn, sortDirection, location]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleLimitChange = (limit) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };
  const currentItems = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the User!")) {
      try {
        await deleteUser(id);
        setAllUsers((prevUser) => prevUser.filter((user) => user.id !== id));
        alert("User Deleted Successfully");
      } catch (error) {
        alert("Failed to delete user.");
      }
    }
  };

  const handleFilterClick = (e) => {
    if (e.target.value) {
      setActiveFilter(e.target.value);
      setShowFilterDropdown(false);
    } else {
      setShowFilterDropdown(!showFilterDropdown);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="flex relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition w-32 flex items-center gap-4 hover:scale-105 duration-200"
          >
            <span><FaFilter /></span>  Filter
          </button>
          {showFilterDropdown && (
            <div className="absolute top-full right-0 mt-2 z-50 bg-white shadow-lg rounded-md border border-gray-200">
              <select
                onChange={handleFilterClick}
                className="w-32 px-4 py-2 rounded-md focus:outline-none"
              >
                <option value="name" >Name</option>
                <option value="email">Email</option>
                <option value="department">Department</option>
              </select>
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder={`Search by ${activeFilter}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-96"
        />
        <Link to="/add">
          <button className="p-2 border rounded-md cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2 hover:scale-105 duration-200">
            <span><IoPersonAddSharp /></span>  Add New User
          </button>
        </Link>
      </div>
      <UserTable
        users={currentItems}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onDelete={handleDelete}
        onEdit={(id) => navigate(`/edit/${id}`)}
      />
      <Pagination
        totalItems={users.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
};

export default Home;