import React from 'react'
import './Home.css'
import ProfileSide from '../../components/ProfileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import PostSide from '../../components/PostSide/PostSide'

const Home = () => {
  return (
    <div className='Home'>
      <ProfileSide/>
      <PostSide/>
      <RightSide/>
      
    </div>
  )
}

export default Home