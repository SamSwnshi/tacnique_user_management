import React from 'react'

const UserTable = ({users}) => {
    console.log("Data from UserTable",users)
  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Company</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}

export default UserTable
