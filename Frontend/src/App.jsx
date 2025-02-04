/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserSignup from "../pages/UserSignup";
import UserLogin from "../pages/UserLogin";
import DriverSignup from "../pages/DriverSignup";
import DriverLogin from "../pages/DriverLogin";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/driver-signup" element={<DriverSignup />} />
        <Route path="/driver-login" element={<DriverLogin />} />
      </Routes>
    </div>
  );
};

export default App;
