import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectToken } from "../auth/authSlice";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    error: null,
    isLoading: false,
  },
  reducers: {
    fetchUsersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = null;
    },
    fetchUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addUserSuccess: (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload);
      state.error = null;
    },
    addUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.isLoading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

// Async action to fetch users (for admin dashboard)
export const fetchUsers = () => async (dispatch, getState) => {
  dispatch(fetchUsersStart());
  const token=localStorage.getItem("token");
  console.log(token);
  if(token=== null){
    const token = selectToken(getState());
    console.log(token);
  }
  console.log(token);
  try {
    const response = await axios.get("http://localhost:8000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.response.data.message));
  }
};

// Async action to add a user
export const addUser =
  (name, email, password, role) => async (dispatch, getState) => {
    dispatch(addUserStart());
    const token = selectToken(getState());
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        { name, email, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addUserSuccess(response.data.user));
    } catch (error) {
      dispatch(addUserFailure(error.response.data.message));
    }
  };

// Async action to update a user
export const updateUser = (userId, userData) => async (dispatch, getState) => {
  dispatch(updateUserStart());
  const token = selectToken(getState());
  try {
    const response = await axios.put(
      `http://localhost:8000/api/users/${userId}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateUserSuccess(response.data.user));
  } catch (error) {
    dispatch(updateUserFailure(error.response.data.message));
  }
};

// Async action to delete a user
export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch(deleteUserStart());
  const token = selectToken(getState());
  try {
    await axios.delete(`http://localhost:8000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteUserSuccess(userId));
  } catch (error) {
    dispatch(deleteUserFailure(error.response.data.message));
  }
};

export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
