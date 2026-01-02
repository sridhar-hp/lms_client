# Leave Management System (LMS) – Frontend

This repository contains the **frontend** of the Leave Management System (LMS), built using **React.js**.  
It provides role-based user interfaces for **Students, Staff, and Admin** to interact with the system.

## Features
- User authentication (Student / Staff / Admin)
- Apply for leave and view leave status
- View real-time leave balance
- Staff and admin dashboards
- Responsive and clean UI

## Tech Stack
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

## Project Structure
LMS
└── lms_client
├── public
├── src
│ ├── api
│ ├── assets
│ ├── pages
│ │ ├── ApplyLeave.jsx
│ │ ├── Dashboard.jsx
│ │ ├── DMenuBar.jsx
│ │ ├── LeaveApply.jsx
│ │ ├── LoginPage.jsx
│ │ ├── MyLeaveStatus.jsx
│ │ ├── NDashboard.jsx
│ │ ├── Settings.jsx
│ │ ├── StaffLeaveRequests.jsx
│ │ └── StudentLeaveRequests.jsx
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
│ └── App.css
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md

## Setup Instructions
1. Clone the repository
2. Navigate to `lms_client`
3. Install dependencies:
4. Start the development server:

## API Communication
- Uses **Axios** to communicate with backend REST APIs
- Authentication handled via JWT tokens

## Author
Sridhar K  
Full Stack Developer
