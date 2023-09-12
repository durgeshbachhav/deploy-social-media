import React, { useEffect } from 'react'
import './Feed.scss'
import Post from '../post/Post'
import Follower from '../follower/Follower'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'

const Feed = () => {


  const dispatch = useDispatch()
  const feedData = useSelector((state) => state?.feedDataReducer?.feedData)

  useEffect(() => {
    dispatch(getFeedData())

  }, [dispatch])


  return (
    <div className="Feed">
      <div className="container">
        <div className="left-part">
          {
            feedData?.posts?.map((post) => (<Post key={post._id} post={post} />))
          }

        </div>
        <div className="right-part">
          <div className="following">
            <h3 className="title">you are followings</h3>
            {
              feedData?.followings?.map(user => <Follower key={user._id} user={user} />)
            }
          </div>
          <div className="suggestions">
            <h3 className="title">suggested for you</h3>
            {
              feedData?.suggestions?.map(user => <Follower key={user._id} user={user} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed