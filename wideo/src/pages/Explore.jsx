import React, { useState } from 'react'

import "./Explore.css"
import Sidebar from '../Components/Sidebar'
import VideoList from '../Components/VideoList'



function Explore() {
   
  return  (
    <div className='explore-container'>
    <Sidebar className="explore-sidebar"/>
    <VideoList className="explore-video"/>

    </div>
  )
}

export default Explore