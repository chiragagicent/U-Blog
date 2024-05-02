import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { selectIsLoggedIn, logout } from "../features/auth/authSlice"; // Import selectIsLoggedIn and logout
import {
  fetchUsers,
  selectUsers,
  deleteUser,
  addUser as addUserAction,
  updateUser as updateUserAction,
} from "../features/user/userSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(selectUsers);
  const isLoggedIn = useSelector(selectIsLoggedIn); // Get login status

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [editformData, setEditformData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleAddUser = () => {
    dispatch(
      addUserAction(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      )
    );
    setFormData({ name: "", email: "", password: "", role: "" });
  };

  const handleUpdateUser = (userId) => {
    const userToUpdate = users.find((user) => user.id === userId);
    if (userToUpdate) {
      setEditformData({
        name: userToUpdate.name,
        email: userToUpdate.email,
        password: userToUpdate.password,
        role: userToUpdate.role,
      });
    }
    setEditUserId(userId);
  };

  const handleEditFormChange = (e) => {
    setEditformData({ ...editformData, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAction(editUserId, editformData));
    setEditformData({ name: "", email: "", password: "", role: "" });
    setEditUserId(null);
  };

  const handleCancelEdit = () => {
    setEditformData({ name: "", email: "", password: "", role: "" });
    setEditUserId(null);
  };
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <button onClick={handleLogout}>Logout</button>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={editUserId !== null}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={editUserId !== null}
        />
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          disabled={editUserId !== null}
        />
        <input
          type="text"
          placeholder="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          disabled={editUserId !== null}
        />
        <button onClick={handleAddUser} disabled={editUserId !== null}>
          Add User
        </button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.role}</p>
            {editUserId === user.id ? (
              <form onSubmit={handleEditFormSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={editformData.name}
                  name="name"
                  onChange={handleEditFormChange}
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={editformData.email}
                  name="email"
                  onChange={handleEditFormChange}
                />
                <input
                  type="text"
                  placeholder="Password"
                  value={editformData.password}
                  name="password"
                  onChange={handleEditFormChange}
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={editformData.role}
                  name="role"
                  onChange={handleEditFormChange}
                />
                <button type="submit">Update</button>
                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <button onClick={() => handleUpdateUser(user.id)}>
                  Edit User
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  Delete User
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
