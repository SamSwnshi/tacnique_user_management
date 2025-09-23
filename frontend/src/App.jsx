import React from 'react'
import './App.css'
import Header from './components/Header'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './components/Home'
import UserForm from './components/UserForm'
const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/users' element={<UserForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
