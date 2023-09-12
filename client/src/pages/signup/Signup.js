import React, { useState } from 'react'
import './Signup.scss'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient';



const Signup = () => {

     const navigate = useNavigate();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [name, setname] = useState('')

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axiosClient.post('/auth/signup', {
                    name,
                    email,
                    password
               })
               console.log("response :",response)
               if(response.status === 'ok')
               {
                    navigate('/login');
               }
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
                    <div className="heading">Signup</div>
                    <form onSubmit={handleSubmit} >
                         <label htmlFor="name">Name</label>
                         <input type="text" id='name' onChange={(e) => setname(e.target.value)} className='name' />
                         <label htmlFor="email">Email</label>
                         <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} className='email' />
                         <label htmlFor="password">password</label>
                         <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} className='password' />
                         <p className='subheading'>Already have an account? <Link className='link' to='/login'>Log in</Link></p>
                         <input type="submit" className='submit' />
                    </form>
                   
               </div>
          </div>
     )
}

export default Signup