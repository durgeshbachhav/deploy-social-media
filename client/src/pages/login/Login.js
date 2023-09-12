import React, { useState } from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';
import boyImg from '../../../src/assets/boyverify.png'

const Login = () => {

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axiosClient.post('/auth/login', {
                    email,
                    password
               })
               setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
               navigate('/');
               console.log("response :", response)

          } catch (error) {
               console.log(error)
          }
     }


     return (
          <div className="Login">
               <div className="img-box">
                    <div>
                         <div className="box-1 box"></div>
                         <div className="box-2 box"></div>
                    </div>
                    <div className='logo'>
                    <h1>SociLink</h1>
                    <p>connect with friends</p>
                    </div>
               </div>
               <div className="Login-box">
                    <div className="heading">login</div>
                    <form onSubmit={handleSubmit} >
                         <label htmlFor="email">Email</label>
                         <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} className='email' />
                         <label htmlFor="password">password</label>
                         <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} className='password' />
                         <p className='subheading'>Do not have an account? <Link className='link' to='/signup'>Sign up</Link></p>
                         <input type="submit" className='submit' />
                    </form>

               </div>
          </div>
     )
}

export default Login