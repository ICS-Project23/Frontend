import React, { useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import LoginView from "./views/Auth/LoginView";
import RegistrationView from "./views/Auth/RegistrationView";
import VoterDashboard from "./views/Voter/VoterDashboard";
import Positions from "./views/Voter/Positions";
import Bus from "./utils/Bus";
import BannerNotification from "./components/BannerNotification";
import AdminDashboard from "./views/Admin/AdminDashboard";

function App() {
    window.flash = (message, type = "success") =>
        Bus.emit("flash", { message, type });
    return (
        <><BannerNotification /><BrowserRouter>
            <Routes>
                <Route path="/" element={ <LoginView /> } />
                <Route path="/register" element={ <RegistrationView /> } />
                <Route path="/dashboard" element={ <VoterDashboard /> } />
                <Route
                    path="/dashboard/positions/:id"
                    element={ <Positions /> } />
                <Route path="admin/dashboard" element={ <AdminDashboard /> } />
            </Routes>
        </BrowserRouter></>
    );
}

export default App;
