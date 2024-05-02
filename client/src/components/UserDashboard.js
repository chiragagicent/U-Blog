import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectPosts,
  deletePost,
  addPost as addPostAction,
  updatePost as updatePostAction,
} from "../features/posts/postsSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { selectIsLoggedIn, logout } from "../features/auth/authSlice"; // Import selectIsLoggedIn and logout

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(selectPosts);
  const isLoggedIn = useSelector(selectIsLoggedIn); // Get login status
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
    dispatch(logout()); // Dispatch logout action
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h2>User Dashboard</h2>
      <div>
        <button onClick={handleLogout}>Logout</button>
        <input
          type="text"
          placeholder="Title"
          value={addPostFormData.title}
          name="title"
          onChange={(e) =>
            setAddPostFormData({ ...addPostFormData, title: e.target.value })
          }
          disabled={editingPostId !== null}
        />
        <textarea
          placeholder="Content"
          value={addPostFormData.content}
          name="content"
          onChange={(e) =>
            setAddPostFormData({ ...addPostFormData, content: e.target.value })
          }
          disabled={editingPostId !== null}
        ></textarea>
        <button onClick={handleAddPost} disabled={editingPostId !== null}>
          Add Post
        </button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {editingPostId === post.id ? (
              <form onSubmit={handleEditFormSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  value={editPostFormData.title}
                  name="title"
                  onChange={handleEditFormChange}
                />
                <textarea
                  placeholder="Content"
                  value={editPostFormData.content}
                  name="content"
                  onChange={handleEditFormChange}
                ></textarea>
                <button type="submit">Update</button>
                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <button onClick={() => handleUpdatePost(post.id)}>
                  Edit Post
                </button>
                <button onClick={() => handleDelete(post.id)}>
                  Delete Post
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
