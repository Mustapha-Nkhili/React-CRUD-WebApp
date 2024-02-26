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
  },
});

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
