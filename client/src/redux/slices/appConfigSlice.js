//iska matlab aisa data jo alag alag state ko define karta hai
// alag alag state ka data rakta hai
// eg.admin page, provider page, user page,
// global state ke liye use hote hai

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk('user/getMyInfo', async () => {
     try {
          const response = await axiosClient.get('/user/getMyInfo')
          console.log('api called data', response)
          return response.result;
     } catch (error) {
          return Promise.reject(error);
     } 
     
})

export const updateMyProfile = createAsyncThunk('user/updateProfile', async (body) => {
     try {
          const response = await axiosClient.put('/user/', body)
          console.log('update profile response: ', response.result)
          return response.result;
     } catch (error) {
          return Promise.reject(error);
     } 
     
})


const appConfigSlice = createSlice({
     name: 'appConfigSlice',
     initialState: {
          isLoading: false,
          toastData:{},
          myProfile: null,
     },
     reducers: {
          // action batayega ki loading true hai ya false
          //reducers are pure function we cant make async function
          setLoading: (state, action) => {
               state.isLoading = action.payload;
          },
          showToast: (state, action)=>{
               state.toastData = action.payload;
          }
     },
     //jab bhi async thunk dal rahe hote ho
     extraReducers: (builder) => {
          builder.addCase(getMyInfo.fulfilled, (state, action) => {
               state.myProfile = action.payload.user;
          }).addCase(updateMyProfile.fulfilled, (state, action) => {
               state.myProfile = action.payload.user;
          })
          
     }
})

export default appConfigSlice.reducer;

export const { setLoading ,showToast } = appConfigSlice.actions;