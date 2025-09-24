import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import { deleteUser, getUsers } from "../service/api";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import FilterPopup from "../components/FilterPop";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchItems, setSearchItems] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  // Fetching data from the api
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

  // fiiltering useEffect
  useEffect(() => {
    let filterAndSort = [...allUsers];
    if (searchItems) {
      filterAndSort = filterAndSort.filter(
        (user) =>
          user.name.toLowerCase().include(searchItems.toLowerCase()) ||
          user.email.toLowerCase().include(searchItems.toLowerCase())
      );
    }
    if (Object.values(filters).some((s) => s)) {
      filterAndSort = filterAndSort.filter((user) => {
        const nameParts = user.name.toLowerCase().split(" ");
        const matchesFirstName =
          !filters.firstName ||
          nameParts[0].includes(filters.firstName.toLowerCase());
        const matchesLastName =
          !filters.lastName ||
          nameParts.slice(1).join(" ").includes(filters.lastName.toLowerCase());
        const matchesEmail =
          !filters.email ||
          user.email.toLowerCase().includes(filters.email.toLowerCase());
        const matchesDepartment =
          !filters.department ||
          user.company.name
            .toLowerCase()
            .includes(filters.department.toLowerCase());
        return (
          matchesFirstName &&
          matchesLastName &&
          matchesEmail &&
          matchesDepartment
        );
      });
    }
    if (sortColumn) {
      filterAndSort.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? -1 : 1;
        return 0;
      });
    }
    setUsers(filterAndSort);
    setCurrentPage(1);
  }, [allUsers, searchItems, filters, sortColumn, sortDirection]);

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
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchItems}
          onChange={(e) => setSearchItems(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full max-w-sm"
        />
        <button
          onClick={() => setShowFilterPopup(true)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Filter
        </button>
      </div>
      <div className="flex justify-end mb-4">
        <Link to="/add">Add New User</Link>
      </div>
      <UserForm />
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
      {showFilterPopup && (
        <FilterPopup
          onFilter={(newFilters) => {
            setFilters(newFilters);
            setShowFilterPopup(false);
          }}
          onClose={() => setShowFilterPopup(false)}
        />
      )}
    </div>
  );
};

export default Home;
