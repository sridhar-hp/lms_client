import React from "react";
import LoginPage from "./pages/LoginPage.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import DMenuBar from "./pages/DMenuBar.jsx";
import LeaveRequests from "./pages/LeaveRequests.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. The first page (e.g., login screen) */}
                <Route path="/" element={<LoginPage />} />

                {/* 2. The Dashboard Layout (parent path is /app-shell) */}
                <Route path="/DMenuBar" element={<DMenuBar />} >

                    {/* Index Route: Renders <DashBoard /> when the URL is exactly /app-shell */}
                    <Route index element={<DashBoard />} />
                    <Route path="DashBoard" element={<DashBoard />} />

                    {/* Placeholder routes for the other pages */}
                    <Route path="leaveRequests" element={<LeaveRequests />} />
                    {/* <Route path="leaveApply" element={<LeaveApply />} /> */}
                    {/* <Route path="Teamview" element={<TeamView />} /> */}

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;