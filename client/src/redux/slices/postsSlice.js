//iska matlab aisa data jo alag alag state ko define karta hai
// alag alag state ka data rakta hai
// eg.admin page, provider page, user page,
// global state ke liye use hote hai

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";



//redux thunk
//mein profile ka data mangaunga

//
export const getUserProfile = createAsyncThunk('user/getUserProfile', async (body) => {
     try {
          // thunkAPI.dispatch(setLoading(true))
          const response = await axiosClient.post('/user/getUserProfile', body);
          return response.result;
     } catch (error) {
          return Promise.reject(error);
     }
     // finally {
     //      thunkAPI.dispatch(setLoading(false))
     // }
})

export const likeAndUnlikePost = createAsyncThunk('post/likeAndUnlike', async (body) => {
     try {
          // thunkAPI.dispatch(setLoading(true))
          const response = await axiosClient.post('/posts/like', body)

          return response.result.post;

     } catch (error) {
          return Promise.reject(error);
     }
     // finally {
     //      thunkAPI.dispatch(setLoading(false))
     // }
})

const postsSlice = createSlice({
     name: 'postsSlice',
     initialState: {
          userProfile: {},
     },
     reducers: {},  // You may have other reducers here

     // When using async thunks, you should handle the fulfilled action
     extraReducers: (builder) => {
          builder
               .addCase(getUserProfile.fulfilled, (state, action) => {
                    state.userProfile = action.payload;
               })
               .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
                    const post = action.payload;

                    // Check if userProfile.posts is defined before trying to find the index
                    if (state.userProfile?.posts) {
                         const index = state.userProfile.posts.findIndex((item) => item._id === post._id);

                         // Check if the index is valid (not undefined and not -1) before updating
                         if (index !== undefined && index !== -1) {
                              // Use immer.js to update the state immutably
                              state.userProfile.posts[index] = post;
                         }
                    }
               });
     },
});

export default postsSlice.reducer;


