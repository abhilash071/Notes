// src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import { AuthProvider } from "./context/AuthContext";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>
// );
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
