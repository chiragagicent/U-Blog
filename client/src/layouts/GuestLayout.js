import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn,logout } from "../features/auth/authSlice";



function GuestLayout() {
    const isLoggedIn = useSelector(selectIsLoggedIn); 
    if(isLoggedIn)
        {   
            localStorage.removeItem("token");
            <Navigate to="/"/>
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