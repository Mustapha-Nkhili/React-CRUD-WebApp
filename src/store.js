import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/posts/postsSLice";
import { initialPosts } from "./constants";

let preloadedState;
const persistedPostsString = localStorage.getItem("posts");

if (persistedPostsString) {
  preloadedState = {
    posts: [...JSON.parse(persistedPostsString), ...initialPosts],
  };
} else {
  preloadedState = {
    posts: initialPosts,
  };
}

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  preloadedState,
});

export default store;
