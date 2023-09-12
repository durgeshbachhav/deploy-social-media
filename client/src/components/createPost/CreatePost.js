import React, { useState } from 'react'
import './CreatePost.scss'
import Avatar from '../avatar/Avatar'
import { BsCardImage } from 'react-icons/bs'
import { axiosClient } from '../../utils/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice'



const CreatePost = () => {

     const [postImg, setpostImg] = useState('')
     const [caption, setcaption] = useState('')
     const dispatch = useDispatch()
     const myProfile = useSelector((state) => state?.appConfigReducer?.myProfile)


     function handleImageChange(e) {
          const file = e.target.files[0];
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
               if (fileReader.readyState === fileReader.DONE) {
                    setpostImg(fileReader.result);
                    console.log("img data", fileReader.result);
               }
          }
     }


     const handlePostSubmit = async () => {
          try {
               const result = await axiosClient.post('/posts', {
                    caption,
                    postImg
               })
               console.log('post done ', result);
               dispatch(getUserProfile({
                    userId: myProfile?._id
               }));
          } catch (error) {
               console.log("this is the error : ", error);
          } finally {
               setcaption('')
               setpostImg('')
          }
     }
     return (
          <div className="CreatePost">
               <div className="first-part">
                    <Avatar src={myProfile?.avatar?.url} />
               </div>
               <div className="second-part">
                    <input type="text" value={caption} placeholder='create new post' className='captionInput' onChange={(e) => setcaption(e.target.value)} />
                    {postImg &&
                         (<div className="img-container">
                              <img src={postImg} alt="post-img" className='post-img' />
                         </div>)
                    }
                    <div className="bottom-part">
                         <div className="input-post-img">
                              <label htmlFor="InputImg" className='labelImg'>
                                   <BsCardImage color='black' />
                              </label>
                              <input className='InputImg' id='InputImg' type="file" accept='image/*' onChange={handleImageChange} />
                         </div>
                         <button className='post-btn btn-primary' onClick={handlePostSubmit}>Post</button>
                    </div>
               </div>
          </div>
     )
}

export default CreatePost