import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts:[],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {  //functions
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";  //old state is replaced
        },
        setLogin: (state, action) => { //action=params for functions
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.connections = action.payload.connections;
            } else {
                console.error("user connection non existent");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map( post => {
                if(post._id === action.payload.post_id)
                    return action.payload.post;
                return post;
            })
            state.posts = updatedPosts;
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;