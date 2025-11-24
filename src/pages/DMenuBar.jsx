import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

function DMenuBar() {

    const { role } = useParams();   // role = "admin" OR "student"

    // ========== ADMIN MENUS ==========
    // const adminMenus = [
    //     { name: "Dashboard", path: `/dashboard/${role}/home`, show: true },
    //     { name: "Students Leave Requests", path: `/dashboard/${role}/studentsleaverequests`, show: true },
    //     { name: "Staff Leave Requests", path: `/dashboard/${role}/staffleaveRequests`, show: true },
    //     { name: "Setting", path: `/dashboard/${role}/setting`, show: true },
    // ];

    // // ========== STUDENT MENUS ==========
    // const studentMenus = [
    //     { name: "Dashboard", path: `/dashboard/${role}/home`, show: true },
    //     { name: "Apply Leave", path: `/dashboard/${role}/applyLeave`, show: true },
    //     { name: "My Leave Status", path: `/dashboard/${role}/leavestatus`, show: true },
    // ];

    // const staffMenus = [
    //     {name: "Dashboard", path: `/dashboard/${role}/home`, show: true},
    //     {name: "Leave Apply", path: `/dahboard/${role}/leaveapply`, show: true},
    //     {name: "My Leave Status", path: `/dashboard/${role}/myleavestatus`, show: true},
    // ];

    const menus = [
        { name: "Dashboard", path: `/dashboard/${role}/home`, show: true },//enta /home is should match the route in app.jsx
        {name: "Apply Leave", path: `/dashboard/${role}/applyleave`, show: true},//

        { name: "Students Leave Requests", path: `/dashboard/${role}/studentleaverequests`, show: true },//
        { name: "Staff Leave Requests", path: `/dashboard/${role}/staffleaveRequests`, show: true },//
        // {name: "Leave Apply", path: `/dashboard/${role}/leaveapply`, show: true},//
        {name: "My Leave Status", path: `/dashboard/${role}/myleavestatus`, show: true},//
        { name: "Setting", path: `/dashboard/${role}/settings`, show: true },//
    ];

    // ========== Choose Menu Based on role ==========
    // const menus = role === "admin" ? adminMenus : ( role === "staff" ? staffMenus : studentMenus);

    return (
        <div className="flex w-screen h-screen bg-gray-100">

            {/* ===== SIDEBAR ===== */}
            <aside className="w-72 bg-indigo-700 text-white p-5 flex flex-col shadow-lg">

                {/* Top Title */}
                <h1 className="text-xl font-bold text-center mb-6">
                    Leave Management
                </h1>

                {/* Role Display */}
                <div className="text-center bg-indigo-600 py-1 rounded-lg mb-8 font-medium">
                    Role: {role?.toUpperCase()}
                </div>

                {/* Dynamic Menu List */}
                <nav className="flex-1 space-y-2">
                    {menus.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded-md font-medium hover:bg-indigo-900 transition 
                                ${isActive ? "bg-indigo-900 border-l-4 border-white" : ""}`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* ===== MAIN CONTENT ===== */}
            <main className="flex-1 p-6">
                <div className="bg-white shadow-md rounded-lg p-6 h-full overflow-y-auto">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}

export default DMenuBar;
