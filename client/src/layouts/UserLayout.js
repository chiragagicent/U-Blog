import {Navigate, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React from 'react'
import { selectIsLoggedIn,selectRole } from "../features/auth/authSlice";
function UserLayout() {
const isLoggedIn = useSelector(selectIsLoggedIn); // Get login status
const role = useSelector(selectRole);
    if (!isLoggedIn || role!=="regular"){
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

export default UserLayout