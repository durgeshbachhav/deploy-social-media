import React from 'react'
import './Avatar.scss'
import UserImg from '../../assets/user.png'

const Avatar = ({src}) => {
     return (
          <div className="Avatar">
               <img src={src ? src : UserImg} alt="user avatar" />
          </div>
     )
}

export default Avatar