🍔 Online Food Ordering System

A full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to browse restaurants, view menus, add items to cart, and place orders.
Includes JWT authentication, Admin Panel, Cart system, and Order Management.

🚀 Live Demo

🔗 https://online-food-ordering-app-kappa.vercel.app/

📁 Project Structure
online-food-ordering/
│
├── backend/
│   ├── config/db.js
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/components/
    ├── App.js
    ├── index.js
    ├── package.json
    └── public/

🛠️ Tech Stack
🎨 Frontend

React.js

React Router

Axios

Bootstrap

🖥️ Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

bcryptjs

CORS

🔐 Environment Variables (Backend)

Create a .env file inside /backend:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

▶️ How to Run Locally
1️⃣ Start Backend
cd backend
npm install
npm run dev

2️⃣ Start Frontend
cd ../frontend
npm install
npm start


🌐 Backend: http://localhost:5000

🌐 Frontend: http://localhost:3000

🔥 Features
👤 User Features

Register & Login (JWT-based)

Browse restaurants

View menu items

Add items to cart

Place orders

View previous orders

🛠️ Admin Panel

Add restaurants

Add food items

Manage orders

💾 Backend Features

Secure JWT authentication

Password hashing using bcryptjs

MongoDB data storage

RESTful API structure

📦 Build for Production (Frontend)
cd frontend
npm run build

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Parth Makwana

If you like this project, feel free to ⭐ star the repo!