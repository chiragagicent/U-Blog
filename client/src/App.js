// App.js
import {useSelector,useDispatch } from "react-redux";
import React from "react";
import {createBrowserRouter} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import NotFound from "./components/NotFound";
//import { selectIsLoggedIn } from "./features/auth/authSlice";
import { selectRole } from "./features/auth/authSlice";
import { Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import GuestLayout from "./layouts/GuestLayout"



const router = createBrowserRouter(

  [
  {
    path:'/',
    element: <AdminLayout />,
    children:[
      {
        path:'/admin-dashboard',
        element:<AdminDashboard/>
      },
        ]
  },
  {
    path:'/',
    element:<UserLayout/>,
    children:[
      {
        path:'/user-dashboard',
        element:<UserDashboard/>
      },
    ]
  },
  {
    path:'/',
    element: <GuestLayout />,
    children:[
      {
        path:'/login',
        element:<LoginForm />
      },
      {
        path:'/register',
        element:<RegistrationForm />
      },
    ]
  },


  {
    path:'*',
    element:<NotFound />
  }
])

export default router;