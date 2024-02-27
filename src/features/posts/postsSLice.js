import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const userPosts = JSON.parse(localStorage.getItem("posts")) || [];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action) {
      state.unshift(action.payload);
      userPosts.unshift(action.payload);
      localStorage.setItem("posts", JSON.stringify(userPosts));
    },
    editPost(state, action) {
      const editedPost = state.map((post) => {
        if (action.payload.id === post.id) {
          return action.payload;
        } else {
          return post;
        }
      });

      for (let i = 0; i < userPosts.length; i++) {
        if (userPosts[i].id === action.payload.id) {
          userPosts[i] = action.payload;
        }
      }

      localStorage.setItem("posts", JSON.stringify(userPosts));
      return editedPost;
    },
    deletePost(state, action) {
      state.map((post, index) => {
        if (post.id === action.payload) {
          state.splice(index, 1);
        }
      });

      for (let i = 0; i < userPosts.length; i++) {
        if (userPosts[i].id === action.payload) {
          userPosts.splice(i, 1);
          localStorage.setItem("posts", JSON.stringify(userPosts));
        }
      }
    },
  },
});

export const { addPost, editPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
