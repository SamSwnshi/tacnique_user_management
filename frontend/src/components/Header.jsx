import React from 'react'
import  { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='flex items-center justify-center py-4 border-b-orange-100 border-1 shadow-lg tracking-wider'>
            <Link to="/">
                <h1 className='text-3xl font-semibold'>User Management Dashboard</h1>
            </Link>
        </div>
    )
}

export default Header
