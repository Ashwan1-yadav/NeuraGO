/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import UserSignup from "../pages/UserSignup";
import UserLogin from "../pages/UserLogin";
import UserLogout from "../pages/UserLogout";
import DriverDashboard from "../pages/DriverDashboard";
import DriverSignup from "../pages/DriverSignup";
import DriverLogin from "../pages/DriverLogin";
import DriverLogout from "../pages/DriverLogout";
import { Navigate } from "react-router-dom";
import UserRouteProtector from "../utils/UserRouteProtector";
import DriverRouteProtector from "../utils/DriverRouteProtector";
import DriverRiding from "../pages/DriverRiding";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <UserRouteProtector>
              <Dashboard />
            </UserRouteProtector>
          }
        />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route
          path="/user-logout"
          element={
            <UserRouteProtector>
              <UserLogout />
            </UserRouteProtector>
          }
        />
        <Route path="/driver-dashboard" 
        element={
          <DriverRouteProtector>
            <DriverDashboard />
          </DriverRouteProtector>
        } 
        />
        <Route path="/driver-signup" element={<DriverSignup />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route
          path="/driver-logout"
          element={
            <UserRouteProtector>
              <DriverLogout />
            </UserRouteProtector>
          }
        />
        <Route path="/driver-riding" element={<DriverRiding/>}>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
