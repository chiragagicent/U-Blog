// authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Function to retrieve authentication token from storage
function getAuthToken() {
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");
  
  // If token is found, return it
  if (token) {
    return token;
  } else {
    return null;    
  }
}

/* const [token,_setToken] = useState(localStorage.getItem("token"));
const setToken=(token)=>{
  if(token){
    localStorage.setItem("token",token);
  }
  else{
    localStorage.removeItem("token");
  }
} */
// Function to retrieve and store CSRF token
function getCsrfToken() {
  return axios
    .get("http://localhost:8000/api/csrf-token")
    .then((response) => response.data.csrfToken)
    .catch((error) => {
      console.error("Failed to retrieve CSRF token:", error);
      return null;
    });
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: null,
    email: null,
    password: null,
    role: null,
    token: localStorage.getItem("token"),
    csrfToken: null,
    error: null,
    isLoading: false,
    isLoggedIn: localStorage.getItem("token")?true:false,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.name = action.payload.user.name;
      state.role = action.payload.user.role;
      state.token = action.payload.token;
      state.isLoggedIn = true; // Update isLoggedIn to true on successful login
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      const token = localStorage.getItem("token");
      console.log(token);
      if(!!token)
      {window.location.href = "/login";}
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.password = null;
      state.role = null;
      state.token = null;
      state.error = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.password = action.payload.user.password;
      state.role = action.payload.user.role;
      state.token = action.payload.token;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCsrfToken: (state, action) => {
      state.csrfToken = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  setCsrfToken,
} = authSlice.actions;

// Async action to log in a user
export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      email,
      password,
    });
    dispatch(loginSuccess(response.data));
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    localStorage.removeItem("token");
  }
};

// Async action to register a user
export const register = (name, email, password, role) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const csrfToken = await getCsrfToken();
    const authToken = getAuthToken();
    const response = await axios.post(
      "http://127.0.0.1:8000/api/register",
      {
        name,
        email,
        password,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include authentication token in request headers
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Set appropriate content type
        },
      }
    );
    dispatch(registerSuccess(response.data.user));
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
  }
};

export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role;
export const selectToken = (state) => state.auth.token;
export const selectCsrfToken = (state) => state.auth.csrfToken;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn; // Add selector for isLoggedIn

export default authSlice.reducer;
