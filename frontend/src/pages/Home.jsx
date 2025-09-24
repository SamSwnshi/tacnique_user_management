import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import {getUsers} from '../service/api'
import UserTable from "./UserTable";
import Pagination from '../components/Pagination'
import FilterPopup from '../components/FilterPop'
const Home = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
        const response = await getUsers();
        setAllUsers(response.data);
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
        }
        fetchData();
    }, []);
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-4">
                <button>Add New User</button>
            </div>
            <UserForm />
            <UserTable users={allUsers}/>
        </div>
    );
};

export default Home;
