import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action) {
      state.unshift(action.payload);
      localStorage.setItem("posts", JSON.stringify(state));
    },
    editPost(state, action) {
      const editedPost = state.map((post) => {
        if (action.payload.id === post.id) {
          return action.payload;
        } else {
          return post;
        }
      });

      localStorage.setItem("posts", JSON.stringify(editedPost));
      return editedPost;
    },
    deletePost(state, action) {
      state.map((post, index) => {
        if (post.id === action.payload) {
          state.splice(index, 1);
          localStorage.setItem("posts", JSON.stringify(state));
        }
      });
    },
  },
});

export const { addPost, editPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
