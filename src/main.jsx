// import React from 'react'
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//     <StrictMode>
//         <App />
//     </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'

// ✅ IMPORT REDUX
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);