import React from "react";
import { NavLink,Outlet } from "react-router-dom";

function DMenuBar() {
    return (
        <>
            <div>
                <div >
                    <NavLink to="DashBoard">My Dashboard</NavLink>
                    <NavLink to="LeaveRequests"> LeaveRequests </NavLink>
                    <NavLink to="LeaveApply">LeaveApply</NavLink>
                    <NavLink to="TeamView"> TeamView</NavLink>
                </div>
                <div >
                    <Outlet />
                </div>
            </div>
        </>
    );
}
export default DMenuBar;

