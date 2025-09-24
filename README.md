# User Management Dashboard

A simple, responsive web application for managing user data. This project demonstrates core **front-end development principles**, including **state management, API interaction, routing, and component-based architecture**.

---

## ✨ Features

- **User Listing**: View a list of users in a clean, paginated table.  
- **CRUD Operations**: Add, Edit, and Delete user entries.  
- **Filtering & Searching**: Easily find users by name, email, or department using a dynamic search bar and a filter dropdown.  
- **Sorting**: Sort the user list by ID, Name, or Email in ascending or descending order.  
- **Pagination**: Navigate through a large dataset with controls for changing the page and items per page.  
- **Responsive UI**: Layout designed to be accessible and functional on mobile, tablet, and desktop.  

---

## 🛠 Tech Stack

- **Frontend**: React.js  
- **Styling**: Tailwind CSS  
- **HTTP Client**: Axios  
- **Routing**: React Router  
- **Mock API**: JSONPlaceholder  

---

## 📂 Project Structure
```
frontend/
├── README.md
├── eslint.config.js
├── index.html
└── src/
├── App.jsx
├── main.jsx
├── components/
│ ├── FilterPop.jsx
│ ├── Header.jsx
│ ├── Pagination.jsx
│ ├── UserForm.jsx
│ └── UserTable.jsx
├── pages/
│ ├── AddUserPage.jsx
│ ├── EditUserPage.jsx
│ └── Home.jsx
└── service/
└── api.js
```

---

## 🚀 Setup and Run Instructions

1. **Clone the repository**  
   ```bash
   git clone [your-repository-url]
   cd [your-project-directory]/frontend
    ```
2. **Install dependencies**
```
npm install
```
3. **Start the development server**
```
npm run dev
```
4. **Open the app in your browser:**
```
👉 http://localhost:5173
```
## 🔗 API Endpoints
```
This project uses the free JSONPlaceholder API.

GET /users → Fetch all users

POST /users → Add a new user (simulated)

PUT /users/:id → Update an existing user (simulated)

DELETE /users/:id → Delete a user (simulated)

⚠️ Note: JSONPlaceholder is a mock API and does not persist data.
All modifications (add, edit, delete) are managed locally in the app’s state to mimic real-world behavior.
```
## ⚡ Challenges Faced
```
State Management: Ensuring updates propagate correctly across components like pages, tables, and forms.

Mock API Limitations: No server-side persistence required handling data updates purely in local state.

Filtering Logic: Creating a robust system to handle search, filters, and multiple criteria.
```
## 🚧 Future Improvements
```
Advanced State Management: Use Redux Toolkit or Zustand for scalability.

User Experience: Replace alert messages with toast notifications for smoother feedback.

Performance Optimization: For larger datasets, implement server-side filtering and optimized search algorithms.

Adding authentication and improving the UI would transform the project from a basic dashboard into a fully functional and professional-looking web application
```
## 🙏 Acknowledgements
```
React.js

Tailwind CSS

Axios

React Router

JSONPlaceholder
```
## 💡 Thank you for exploring this project! 🚀