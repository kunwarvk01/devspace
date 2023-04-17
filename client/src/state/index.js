import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

// Create auth slice
export const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState: initialState, // Initial state of the slice
  reducers: {
    // Define reducers for state updates
    setMode: (state) => {
      // Update mode state
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      // Update user and token state after login
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      // Update user and token state after logout
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      // Update user's friends list
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      // Update the list of posts
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      // Update a specific post
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// Export actions for use in components
export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
} = authSlice.actions;

// Export the reducer for use in the store
export default authSlice.reducer;
