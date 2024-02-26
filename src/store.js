import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/posts/postsSLice";

let preloadedState;
const persistedPostsString = localStorage.getItem("posts");

if (persistedPostsString) {
  preloadedState = {
    posts: JSON.parse(persistedPostsString),
  };
}

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  preloadedState,
});

export default store;
