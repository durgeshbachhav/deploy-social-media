import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from './localStorageManager'
import axios from 'axios'
import store from '../redux/store'
import { TOAST_FAILURE } from '../App'
import { setLoading, showToast } from '../redux/slices/appConfigSlice'

export const axiosClient = axios.create({
     baseURL: "/",
     withCredentials: true,
})

//when request from frontend
axiosClient.interceptors.request.use(
     (request) => {

          // which i make in localstorage
          const accessToken = getItem(KEY_ACCESS_TOKEN)
          // send to headers
          request.headers["Authorization"] = `Bearer ${accessToken}`;
          store.dispatch(setLoading(true));
          return request;

          //in backend it say invalid use key but not in frontend because it is interceptor 

     }
)



//when response from backend
axiosClient.interceptors.response.use(
     async (response) => {

          store.dispatch(setLoading(false));
          const data = response.data;
          if (data.status === 'ok') {
               return data
          }
          //status code is 401 then refresh access token
          const originalRequest = response.config;
          const statusCode = data.statusCode;
          const error = data.message;
          // const error = data.error

          store.dispatch(showToast({
               type: TOAST_FAILURE,
               message: error,
          }))


          // access token expire
          if (statusCode === 401 && !originalRequest._retry) {
               originalRequest._retry = true;
               const response = await axios.create({ withCredentials: true, }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`)
               if (response.status === 'ok') {

                    setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken)
                    originalRequest.headers['Authorization'] = `Bearer ${response.result.accessToken}`
                    return axios(originalRequest);
               }
               else {

                    // when refresh token exprire ,send user to login page
                    removeItem(KEY_ACCESS_TOKEN)

                    // Access localStorage here
                    window.location.replace("/login", "_self");

                    return Promise.reject(error);
               }
          }
          console.log('axios error', error)

          return Promise.reject(error)
     }, async (error) => {
          store.dispatch(setLoading(false));
          store.dispatch(showToast({
               type: TOAST_FAILURE,
               message: error.message
          }))

          return Promise.reject(error)
     }
)