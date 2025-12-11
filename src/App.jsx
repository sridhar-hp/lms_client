import React from "react";
import LoginPage from "./pages/LoginPage.jsx";
import DashBoard from "./pages/Dashboard.jsx";
import DMenuBar from "./pages/DMenuBar.jsx";
// import StaffLeaveRequests from "./pages/StaffLeaveRequests.jsx";
import ApplyLeave from "./pages/ApplyLeave.jsx";
import MyLeaveStatus from "./pages/MyLeaveStatus.jsx";
import Settings from "./pages/Settings.jsx";
// import LeaveApply from "./pages/LeaveApply.jsx";
import StudentLeaveRequests from "./pages/StudentLeaveRequests.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route path="/dashboard/:Role" element={<DMenuBar />}>
                    <Route path="home" element={<DashBoard />} />
                    <Route index element={<DashBoard />} />
                    {/* <Route path="staffleaverequests" element={<StaffLeaveRequests />} /> */}
                    <Route path="studentleaverequests" element={<StudentLeaveRequests />} />
                    <Route path="applyleave" element={<ApplyLeave />} />
                    <Route path="myleavestatus/:Id" element={<MyLeaveStatus />} />
                    {/* <Route path="leaveapply" element={<LeaveApply />} /> */}
                    <Route path="setting" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
