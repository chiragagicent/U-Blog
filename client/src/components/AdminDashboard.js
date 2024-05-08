


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn, logout } from "../features/auth/authSlice";
import {
  fetchUsers,
  selectUsers,
  deleteUser,
  addUser as addUserAction,
  updateUser as updateUserAction,
  setUsers,
} from "../features/user/userSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(selectUsers);
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
    dispatch(setUsers());
    dispatch(logout());
  };

/*   useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn,navigate]); */

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={editUserId !== null}
          className="border rounded px-4 py-2 mt-2 mr-2 focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={editUserId !== null}
          className="border rounded px-4 py-2 mt-2 mr-2 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          disabled={editUserId !== null}
          className="border rounded px-4 py-2 mt-2 mr-2 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          disabled={editUserId !== null}
          className="border rounded px-4 py-2 mt-2 mr-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddUser}
          disabled={editUserId !== null}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Add User
        </button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-4">
            <h3 className="text-xl font-bold mb-2">{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.role}</p>
            {editUserId === user.id ? (
              <form onSubmit={handleEditFormSubmit} className="mt-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editformData.name}
                  name="name"
                  onChange={handleEditFormChange}
                  className="border rounded px-4 py-2 mt-2 mr-2 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editformData.email}
                  name="email"
                  onChange={handleEditFormChange}
                  className="border rounded px-4 py-2 mt-2 mr-2 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={editformData.password}
                  name="password"
                  onChange={handleEditFormChange}
                  className="border rounded px-4 py-2 mt-2 mr-2 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={editformData.role}
                  name="role"
                  onChange={handleEditFormChange}
                  className="border rounded px-4 py-2 mt-2 mr-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none mr-2"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="mt-4">
                <button
                  onClick={() => handleUpdateUser(user.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mr-2"
                >
                  Edit User
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                >
                  Delete User
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
