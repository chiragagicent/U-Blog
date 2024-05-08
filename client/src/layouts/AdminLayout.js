import {Navigate, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../features/auth/authSlice"
import React from 'react'
import { selectIsLoggedIn,selectRole } from "../features/auth/authSlice";
function AdminLayout() {
const isLoggedIn = useSelector(selectIsLoggedIn); // Get login status
const role = useSelector(selectRole);
const dispatch = useDispatch();
    if (!isLoggedIn || role!=="admin"){
        dispatch(logout());
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