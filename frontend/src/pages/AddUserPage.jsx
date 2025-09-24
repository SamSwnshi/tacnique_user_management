import React from 'react'
import UserForm from '../components/UserForm'
import { addUser } from '../service/api'
import { useNavigate } from 'react-router-dom'

const AddUserPage = () => {
  const navigate = useNavigate();
  const handleSave = async (userData) => {
    try {
      const response = await addUser(userData);

      alert('User added successfully!');
      navigate('/', { state: { newUser: { ...userData, id: response.data.id } } });
    } catch (error) {
      alert('Failed to add user. Please try again.');
    }
  };
  return (
    <div className="container mx-auto p-4">
      <UserForm onSave={handleSave} onCancel={() => navigate('/')} />
    </div>
  )
}

export default AddUserPage
