Leave Management System (LMS)

A full-stack Leave Management System built using React, Node.js, Express, and MongoDB.
This system allows students and staff to apply for leave, view real-time leave balances, and enables administrators to manage users and leave requests efficiently.

🚀 Features
👤 User Authentication

Student & Staff registration

Secure login system

Role-based access (Student / Staff / Admin)

📝 Leave Application

Apply for leave with:

Leave type

Start & end date

Reason

Automatic leave duration calculation

Prevents applying beyond available leave balance

📊 Leave Balance Management

Default leave balance assigned at account creation

Live leave balance fetched from backend

Leave balance automatically reduced after successful leave application

Real-time validation on frontend

🛠 Admin / Staff Capabilities

View all users

Edit user details

Manage leave records

Track leave status (Pending / Approved / Rejected)

🔄 Data Persistence

Leave history stored in MongoDB

Leave balances persist after refresh or re-login

🧑‍💻 Tech Stack
Frontend

React.js

React Router DOM

Axios

Tailwind CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

Tools

Git & GitHub

VS Code

Postman

📁 Project Structure
LMS
│
├── lms_client
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── pages
│   │   │   ├── ApplyLeave.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DMenuBar.jsx
│   │   │   ├── LeaveApply.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MyLeaveStatus.jsx
│   │   │   ├── NDashboard.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── StaffLeaveRequests.jsx
│   │   │   └── StudentLeaveRequests.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── lms_server
│   ├── config
│   ├── controllers
│   │   ├── actionController.js
│   │   ├── applyController.js
│   │   ├── authController.js
│   │   ├── leaveController.js
│   │   ├── requestController.js
│   │   ├── settingsController.js
│   │   └── statusController.js
│   ├── middleware
│   │   └── auth.js
│   ├── models
│   │   ├── User.js
│   │   └── Leave.js
│   ├── routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── Server.js
│   ├── .env
│   └── package.json


🗄 Database Design
👤 User Schema
{
  Id: String,
  name: String,
  email: String,
  password: String,
  role: String,
  leaveBalance: {
    "Annual Leave": Number,
    "Sick Leave": Number,
    "Casual Leave": Number
  }
}

📝 Leave Schema
{
  name: String,
  leaveType: String,
  startDate: Date,
  endDate: Date,
  duration: Number,
  leaveReason: String,
  status: String,
  userId: String,
  appliedDate: Date
}

🔄 Application Flow

User registers → default leave balance assigned

User logs in → redirected based on role

Leave balance fetched from backend

User applies for leave

Backend validates leave balance

Leave saved → balance reduced

Updated balance shown on next visit

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/lms.git

2️⃣ Backend setup
cd server
npm install
npm start

3️⃣ Frontend setup
cd client
npm install
npm run dev

4️⃣ Environment Variables

Create .env in server/

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

📌 Learning Outcomes

Full-stack application architecture

REST API design

React state management

MongoDB schema design

Real-time data synchronization

Role-based access control

🚧 Future Enhancements

Leave approval & rejection workflow

Email notifications

Holiday & weekend exclusion

Admin dashboard analytics

Password encryption (bcrypt)

JWT-based authentication

Pagination & search filters

👨‍💻 Author

Sridhar (CodeSpark)
Aspiring AI Full-Stack Developer
Skills: React • Node.js • MongoDB • MySQL • Express • JavaScript

⭐ If you like this project

Give it a ⭐ on GitHub — it motivates learning developers 😊