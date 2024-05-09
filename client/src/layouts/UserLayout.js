import {Navigate, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React from 'react'
import { logout, selectIsLoggedIn,selectRole } from "../features/auth/authSlice";
function UserLayout() {
const isLoggedIn = useSelector(selectIsLoggedIn); // Get login status
const role = useSelector(selectRole);
const dispatch = useDispatch();

    if (!isLoggedIn || role!=="regular"){
        if(isLoggedIn)
          {
            
            dispatch(logout());
            return <Navigate to="/login" />
          }
        return <Navigate to="/login" />
    }
  return (
    <div>
        <div>
            <Outlet />
        </div>
    </div>
  );
}

export default UserLayout