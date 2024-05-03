// App.js
import {useSelector,useDispatch } from "react-redux";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
//import { selectIsLoggedIn } from "./features/auth/authSlice";
import { selectRole } from "./features/auth/authSlice";
import { Navigate } from "react-router-dom";
window.addEventListener("beforeunload", () => {
  // Clear token from local storage
  localStorage.removeItem("token");
});
/* 
const PrivateRoutes = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Get login status
  return (
    isLoggedIn ? <Outlet/> : <Navigate to='/login'/>
  )
}
 */
const App = () => {
  //const isLoggedIn = useSelector(selectIsLoggedIn); // Get login status
  const role = useSelector(selectRole); 
  //const dispatch = useDispatch();
  return (

    <Router>
      <Routes>
            <Route path="/login" element={<LoginForm/> } />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/admin-dashboard" element={role==="admin"?<AdminDashboard />:<Navigate to="/"/>} />
            <Route path="/user-dashboard" element={role==="regular"?<UserDashboard />:<Navigate to="/"/>} />
      </Routes>
    </Router>
  );
};

export default App;
