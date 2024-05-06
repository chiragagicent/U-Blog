import {Navigate, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React from 'react'
import { selectIsLoggedIn,selectRole } from "../features/auth/authSlice";
function AdminLayout() {
const isLoggedIn = useSelector(selectIsLoggedIn); // Get login status
const role = useSelector(selectRole);
    if (!isLoggedIn || role!=="admin"){
        localStorage.removeItem("token");
        return <Navigate to="/login" />
    }
  return (
    <div>
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout