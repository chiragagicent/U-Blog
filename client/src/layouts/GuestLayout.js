import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn,logout } from "../features/auth/authSlice";



function GuestLayout() {
    const isLoggedIn = useSelector(selectIsLoggedIn); 
    if(isLoggedIn)
        {   
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            <Navigate to="/login"/>
        }
  return (
    <div>
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default GuestLayout