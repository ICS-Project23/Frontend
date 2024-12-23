import React, { useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";
import VoterDashboard from "./views/VoterDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegistrationView />} />
                <Route path="/dashboard" element={<VoterDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
