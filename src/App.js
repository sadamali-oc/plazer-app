import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PasswordChange from "./pages/PasswordChange/PasswordChange";
import MyProfile from "./pages/profile/UpdateProfile";

function App() {
  return (
    <Routes>
      {/* Redirect from default path to /profile */}
      <Route path="/" element={<Navigate to="/profile" />} />

      {/* Route for MyProfile component */}
      <Route path="/profile" element={<MyProfile />} />

      {/* Route for PasswordChange component */}
      <Route path="/profile/:userId/password" element={<PasswordChange />} />
    </Routes>
  );
}

export default App;
