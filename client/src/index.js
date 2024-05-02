import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js"; // Assuming you have an auth reducer file
import postsReducer from "./features/posts/postsSlice"; // Assuming you have a post reducer file
import userReducer from "./features/user/userSlice"; // Assuming you have a user reducer file

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const store = configureStore({
  reducer: {
    auth: authReducer, // Replace 'authReducer' with your actual auth reducer
    posts: postsReducer, // Replace 'postReducer' with your actual post reducer
    user: userReducer, // Replace 'userReducer' with your actual user reducer
    // Add more reducers if you have them
  },
  // Optionally, you can add middleware, enhancers, etc.
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
