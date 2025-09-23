import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import axios from "axios";
import UserTable from "./UserTable";
const API_URL = "https://jsonplaceholder.typicode.com/users";
const Home = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(API_URL);
                const data = response.data;
                console.log(data);
                // console.log(data[0].company.name)
                const users = data.map((user, idx) => ({
                    id: user.id,
                    company: user.company.name,
                    email: user.email,
                    username: user.username,
                    website: user.website,
                    phone: user.phone,
                    city:user.address.city
                }));
                setAllUsers(users)
            } catch (err) {
                setError("Failed to Fetch the Users, Please Try Again!")
            } finally {
                setIsLoading(false)
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
