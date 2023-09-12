//saare reducer define yaha hote hai

import { configureStore } from '@reduxjs/toolkit'
import appConfigReducer from './slices/appConfigSlice'
import postReducer from './slices/postsSlice'
import feedDataReducer from './slices/feedSlice'
export default configureStore({
     reducer: {
          appConfigReducer,
          postReducer,
          feedDataReducer
     }
})