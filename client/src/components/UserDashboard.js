import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  deletePost,
  addPost as addPostAction,
  updatePost as updatePostAction,
  setPosts
} from "../features/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn, logout } from "../features/auth/authSlice";
import { selectPosts } from "../features/posts/postsSlice";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(selectPosts);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [addPostFormData, setAddPostFormData] = useState({
    title: "",
    content: "",
  });
  const [editPostFormData, setEditPostFormData] = useState({
    title: "",
    content: "",
  });
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleAddPost = () => {
    dispatch(addPostAction(addPostFormData.title, addPostFormData.content));
    setAddPostFormData({ title: "", content: "" });
  };

  const handleUpdatePost = (postId) => {
    const postToUpdate = posts.find((post) => post.id === postId);
    if (postToUpdate) {
      setEditPostFormData({
        title: postToUpdate.title,
        content: postToUpdate.content,
      });
    }
    setEditingPostId(postId);
  };

  const handleEditFormChange = (e) => {
    setEditPostFormData({
      ...editPostFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePostAction(editingPostId, editPostFormData));
    setEditPostFormData({ title: "", content: "" });
    setEditingPostId(null);
  };

  const handleCancelEdit = () => {
    setEditPostFormData({ title: "", content: "" });
    setEditingPostId(null);
  };

  const handleLogout = () => {
    dispatch(setPosts());
    dispatch(logout());
  };
 
  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">User Dashboard</h2>
        <div className="mb-4 flex items-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none mr-4"
          >
            Logout
          </button>
          <input
            type="text"
            placeholder="Title"
            value={addPostFormData.title}
            name="title"
            onChange={(e) =>
              setAddPostFormData({ ...addPostFormData, title: e.target.value })
            }
            disabled={editingPostId !== null}
            className="border rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 bg-gray-800 text-white flex-grow"
          />
          <input
            placeholder="Content"
            value={addPostFormData.content}
            name="content"
            onChange={(e) =>
              setAddPostFormData({ ...addPostFormData, content: e.target.value })
            }
            disabled={editingPostId !== null}
            className="border rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 bg-gray-800 text-white flex-grow"
          ></input>
          <button
            onClick={handleAddPost}
            disabled={editingPostId !== null}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Add Post
          </button>
        </div>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p>{post.content}</p>
              {editingPostId === post.id ? (
                <form onSubmit={handleEditFormSubmit} className="mt-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={editPostFormData.title}
                    name="title"
                    onChange={handleEditFormChange}
                    className="border rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 bg-gray-800 text-white flex-grow"
                    style={{ height: "40px" }}
                  />
                  <input
                    placeholder="Content"
                    value={editPostFormData.content}
                    name="content"
                    onChange={handleEditFormChange}
                    className="border rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 bg-gray-800 text-white flex-grow"
                    style={{ height: "40px" }}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400 focus:outline-none"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="mt-2">
                  <button
                    onClick={() => handleUpdatePost(post.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                  >
                    Edit Post
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 focus:outline-none"
                  >
                    Delete Post
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;

