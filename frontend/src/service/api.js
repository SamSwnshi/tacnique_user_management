import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = () => {
  return api.get('/');
};

export const addUser = (userData) => {
  return api.post('/', userData);
};

export const updateUser = (id, userData) => {
  return api.put(`/${id}`, userData);
};

export const deleteUser = (id) => {
  return api.delete(`/${id}`);
};