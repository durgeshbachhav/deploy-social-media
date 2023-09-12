import React, { useEffect, useState } from 'react'
import './Profile.scss'
import Post from '../post/Post'
import UserImg from '../../assets/user.png'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice'
import { followAndUnfollowUser } from '../../redux/slices/feedSlice'



const Profile = () => {
     const navigate = useNavigate()
     const userProfile = useSelector((state) => state.postReducer.userProfile)
     const myProfile = useSelector((state) => state.appConfigReducer.myProfile)
     const feedData = useSelector((state) => state.feedDataReducer.feedData)
     const param = useParams();
     const dispatch = useDispatch();
     const [isMyProfile, setIsMyProfile] = useState(false)
     const [isFollowing, setIsFollowing] = useState(false)



     useEffect(() => {
          dispatch(getUserProfile({
               userId: param.userId,
          }))
     
          setIsMyProfile(myProfile?._id === param.userId)

          setIsFollowing(
               feedData?.followings?.find((item) => item._id === param.userId)
          )
          
     }, [myProfile, param.userId , feedData])

     const handleUserFollow = () => {
          dispatch(followAndUnfollowUser({
               userIdToFollow : param.userId
          }))
     }

     return (
          <div className="Profile">
               <div className="container">
                    <div className="left-part">
                         {isMyProfile &&
                              <CreatePost />
                         }
                         {
                              userProfile?.posts?.map((post) => (<Post key={post._id} post={post}/>))
                         }
                    </div>
                    <div className="right-part">
                         <div className="profile-card">
                              <img className='user-img' src={  userProfile?.avatar?.url || UserImg } alt="" />
                              <h3 className='user-name'>{userProfile?.name}</h3>
                              <p className='user-bio'>{userProfile?.bio}</p>
                              <div className="follower-info">
                                   <div>
                                   <h4>{`${userProfile?.followers?.length} `}</h4>
                                   <h5>followers</h5>
                                   </div>
                                   <div>
                                   <h4>{`${userProfile?.followings?.length} `}</h4>
                                   <h5>followings</h5>
                                   </div>

                              </div>
                              {
                                   !isMyProfile &&
                                   (
                                        <button onClick={handleUserFollow} className={isFollowing ? "follow-link hover-link btn-primary" : "btn-primary"} >{isFollowing ? "Unfollow" : "Follow"}</button>
                                   )
                              }
                              {
                                   isMyProfile &&
                                   <button className='update-profile btn-primary' onClick={() => navigate('/updateProfile')}>update profile</button>
                              }

                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Profile