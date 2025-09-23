import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { getUsers } from "../services/api";
import UserTable from "./UserTable";
const API_URL = "https://jsonplaceholder.typicode.com/users";
const Home = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUsers()
                const data = response.data;
                console.log(data)
                setAllUsers(data)
            } catch (err) {
                setError('Failed to fetch users. Please try again.');
                console.error(err);
            }
        }
        fetchUser()
    },[])
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-4">
                <button>Add New User</button>
            </div>
            <UserForm />
            <UserTable users={allUsers} />
        </div>
    );
};

export default Home;
