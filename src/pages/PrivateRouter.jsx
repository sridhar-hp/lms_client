// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRouter = ({ children }) => {
//   const token = sessionStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default PrivateRouter;
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRouter;