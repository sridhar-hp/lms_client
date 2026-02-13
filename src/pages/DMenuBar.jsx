import React from "react";
import { NavLink, Outlet, useParams, useLocation } from "react-router-dom";

function DMenuBar() {
    const location = useLocation();
    const userId = location.state?.userId;
    sessionStorage.setItem("userId", userId);
    const { Role } = useParams();   // role = "admin" OR "student"

    const adminMenus = [
        { name: "Dashboard", path: `/dashboard/${Role}/home`, show: true },
        { name: "Leave Requests", path: `/dashboard/${Role}/studentleaverequests/`, show: true },
        { name: "Setting", path: `/dashboard/${Role}/setting`, show: true },
        { name: "Logout", path: `/..`, show: true },

    ];

    const studentMenus = [
        { name: "Dashboard", path: `/dashboard/${Role}/home`, show: true },
        { name: "Apply Leave", path: `/dashboard/${Role}/applyLeave`, show: true },
        { name: "My Leave Status", path: `/dashboard/${Role}/myleavestatus/${userId}`, show: true },
        { name: "Logout", path: `/`, show: true },


    ];

    const staffMenus = [
        { name: "Dashboard", path: `/dashboard/${Role}/home`, show: true },
        { name: "Apply Leave", path: `/dashboard/${Role}/applyleave`, show: true },
        { name: "My Leave Status", path: `/dashboard/${Role}/myleavestatus/${userId}`, show: true },
        { name: "Logout", path: `/`, show: true },

    ];

    const menus = Role === "admin" ? adminMenus : (Role === "staff" ? staffMenus : studentMenus);

    return (
        <div className="flex w-screen h-screen bg-gray-100">

            <aside className="w-72 bg-indigo-700 text-white p-5 flex flex-col shadow-lg">

                <h1 className="text-xl font-bold text-center mb-6">
                    Leave Management
                </h1>

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

            <main className="flex-1 p-6">
                <div className="bg-white shadow-md rounded-lg p-6 h-full overflow-y-auto">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}

export default DMenuBar;
