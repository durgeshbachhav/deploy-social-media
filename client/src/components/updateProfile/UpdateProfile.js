import React, { useEffect, useState } from 'react'
import './UpdateProfile.scss'
import bgImg from '../../assets/user.png'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, updateMyProfile } from '../../redux/slices/appConfigSlice';
import { useNavigate } from 'react-router-dom';



const UpdateProfile = () => {
     const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
     const [name, setname] = useState("")
     const [bio, setBio] = useState("")
     const [userImg, setUserImg] = useState("")
     const dispatch = useDispatch();
     const navigate = useNavigate();

     useEffect(() => {
          setname(myProfile?.name || '')
          setBio(myProfile?.bio || '')
          setUserImg(myProfile?.avatar?.url)
     }, [myProfile])

     function handleImageChange(e) {
          //file reader are using base 64 incode karna hai backend ko bejne ke liye
          const file = e.target.files[0];
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
               if (fileReader.readyState === fileReader.DONE) {
                    setUserImg(fileReader.result);
                    console.log("img data", fileReader.result);
               }
          }

     }
     function handleSubmit(e) {
          e.preventDefault();
          dispatch(updateMyProfile({
               name, bio, userImg
          }))
     }

     return (
          <div className="UpdateProfile">
               <div className="container">
                    <div className="left-part">
                         {/* <img className='userImg' src={userImg} alt="user img" /> */}
                         {/* is ab naye tarike se use karte hai */}
                         <div className="input-user-img">
                              <label htmlFor="InputImg" className='labelImg'>
                                   <img src={userImg ? userImg : bgImg} alt="" />
                              </label>
                              <input className='InputImg' id='InputImg' type="file" accept='image/*' onChange={handleImageChange} />
                         </div>

                    </div>
                    <div className="right-part">
                         <form onSubmit={handleSubmit}>
                              <input type="text" value={name} placeholder='Your Name' onChange={(e) => setname(e.target.value)} />
                              <input type="text" value={bio} placeholder='Your Bio' onChange={(e) => setBio(e.target.value)} />

                              <input type="submit" className='btn-primary' onClick={handleSubmit} />

                         </form>
                         <button className='delete-account btn-primary'>Delete Account</button>
                    </div>
               </div>
          </div>
     )
}

export default UpdateProfile