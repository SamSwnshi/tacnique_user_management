import React from 'react'
import './App.css'
import Header from './components/Header'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddUserPage from './pages/AddUserPage'
import EditUserPage from './pages/EditUserPage'
const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddUserPage/>}/>
        <Route path='/edit' element={<EditUserPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
