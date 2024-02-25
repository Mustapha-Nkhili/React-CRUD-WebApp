import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/posts/postsSLice";

let preloadedState;
const persistedTodosString = localStorage.getItem("todos");

if (persistedTodosString) {
  preloadedState = {
    todos: JSON.parse(persistedTodosString),
  };
}

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  preloadedState,
});

export default store;
