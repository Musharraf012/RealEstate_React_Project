import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import Login from "./login.jsx";
import Lead from "./Lead/Lead.jsx";
import Contact from "./Contact/Contact.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Lead />
    </BrowserRouter>
   
  </React.StrictMode>
);
