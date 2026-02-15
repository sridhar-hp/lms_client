// import React from "react";
// import LoginPage from "./pages/LoginPage.jsx";
// import DashBoard from "./pages/Dashboard.jsx";
// import DMenuBar from "./pages/DMenuBar.jsx";
// import ApplyLeave from "./pages/ApplyLeave.jsx";
// import MyLeaveStatus from "./pages/MyLeaveStatus.jsx";
// import Settings from "./pages/Settings.jsx";
// import StudentLeaveRequests from "./pages/StudentLeaveRequests.jsx";
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import PrivateRouter from "./pages/PrivateRouter.jsx";

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<LoginPage />} />
//                 <Route element={<PrivateRouter />}>
//                 <Route path="/dashboard/:Role" element={<DMenuBar />}>
//                     <Route path="home" element={<DashBoard />} />
//                     <Route index element={<DashBoard />} />
//                     <Route path="studentleaverequests" element={<StudentLeaveRequests />} />
//                     <Route path="applyleave" element={<ApplyLeave />} />
//                     <Route path="myleavestatus/:userId" element={<MyLeaveStatus />} />
//                     <Route path="setting" element={<Settings />} />
//                 </Route>
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import DashBoard from "./pages/Dashboard.jsx";
import DMenuBar from "./pages/DMenuBar.jsx";
import ApplyLeave from "./pages/ApplyLeave.jsx";
import MyLeaveStatus from "./pages/MyLeaveStatus.jsx";
import Settings from "./pages/Settings.jsx";
import StudentLeaveRequests from "./pages/StudentLeaveRequests.jsx";
import PrivateRouter from "./pages/PrivateRouter.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected routes (normal wrapper style) */}
        <Route
          path="/dashboard/:Role"
          element={
            <PrivateRouter>
              <DMenuBar />
            </PrivateRouter>
          }
        >
          <Route
            index
            element={
              <PrivateRouter>
                <DashBoard />
              </PrivateRouter>
            }
          />

          <Route
            path="home"
            element={
              <PrivateRouter>
                <DashBoard />
              </PrivateRouter>
            }
          />

          <Route
            path="studentleaverequests"
            element={
              <PrivateRouter>
                <StudentLeaveRequests />
              </PrivateRouter>
            }
          />

          <Route
            path="applyleave"
            element={
              <PrivateRouter>
                <ApplyLeave />
              </PrivateRouter>
            }
          />

          <Route
            path="myleavestatus/:userId"
            element={
              <PrivateRouter>
                <MyLeaveStatus />
              </PrivateRouter>
            }
          />

          <Route
            path="setting"
            element={
              <PrivateRouter>
                <Settings />
              </PrivateRouter>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
