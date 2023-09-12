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

     //jab bhi async thunk dal rahe hote ho
     extraReducers: (builder) => {
          builder.addCase(getUserProfile.fulfilled, (state, action) => {
               state.userProfile = action.payload;
          }).addCase(likeAndUnlikePost.fulfilled, (state, action) => {
               const post = action.payload;
               const index = state.userProfile?.posts?.findIndex((item) => item._id === post._id)
               console.log('postSlice', index);
               if (index !== undefined && index !== -1) {
                    state.userProfile.posts[index] = post;
               }
          })
     }

})

export default postsSlice.reducer;

