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

export const { addPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
