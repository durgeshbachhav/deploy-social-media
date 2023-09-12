//iska matlab aisa data jo alag alag state ko define karta hai
// alag alag state ka data rakta hai
// eg.admin page, provider page, user page,
// global state ke liye use hote hai

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { likeAndUnlikePost } from "./postsSlice";


//redux thunk
//mein profile ka data mangaunga

//
export const getFeedData = createAsyncThunk('user/getFeedData', async () => {
     try {
          // thunkAPI.dispatch(setLoading(true))
          const response = await axiosClient.get('/user/getFeedData',)
          console.log('user feed data : ', response.result)
          return response.result;
     } catch (error) {
          return Promise.reject(error);
     }
     //  finally {
     //      thunkAPI.dispatch(setLoading(false))
     // }
})

export const followAndUnfollowUser = createAsyncThunk('user/followAndUnfollow', async (body) => {
     try {
          // thunkAPI.dispatch(setLoading(true))
          const response = await axiosClient.post('/user/follow', body)
          return response.result.user;
     } catch (error) {
          return Promise.reject(error);
     }
     // finally {
     //      thunkAPI.dispatch(setLoading(false))
     // }
})


const feedSlice = createSlice({
     name: 'feedSlice',
     initialState: {
          feedData: {},
          isLoading:false,
     },

     //jab bhi async thunk dal rahe hote ho
     extraReducers: (builder) => {
          builder.addCase(getFeedData.fulfilled, (state, action) => {
               state.feedData = action.payload;
          }).addCase(likeAndUnlikePost.fulfilled, (state, action) => {
               const post = action.payload;
               const index = state?.feedData?.posts?.findIndex((item) => item._id === post._id)
               if (index !== undefined && index != -1) {
                    state.feedData.posts[index] = post;
               }
          }).addCase(followAndUnfollowUser.fulfilled, (state, action) => {

               const user = action.payload;
               // const user = action.payload.userIdToFollow;
               const index = state?.feedData?.followings?.findIndex(item => item._id == user._id)
               if (index != -1) {
                    state?.feedData.followings.splice(index, 1)
               } else {
                    state?.feedData.followings.push(user);
               }
          })
     }

})

export default feedSlice.reducer;

