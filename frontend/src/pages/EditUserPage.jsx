import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { getUsers, updateUser } from '../service/api';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUsers();
        const foundUser = response.data.find(u => u.id === parseInt(id));
        if (foundUser) {
          setUser(foundUser);
        } else {
          alert('User not found.');
          navigate('/');
        }
      } catch (error) {
        alert('Failed to fetch user data.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleSave = async (userData) => {
    try {
      await updateUser(id, userData);
      alert('User updated successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to update user. Please try again.');
    }
  };

  if (loading) return <div className="text-center mt-20">Loading user data...</div>;

  return (
    <div className="container mx-auto p-4">
      {user && <UserForm user={user} onSave={handleSave} onCancel={() => navigate('/')} />}
    </div>
  );
};

export default EditUserPage;