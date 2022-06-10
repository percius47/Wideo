import React from 'react'
import { Route, Routes } from "react-router-dom";
import SingleVideo from '../pages/SingleVideo';
import Explore from '../pages/Explore';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import LikesPage from '../Components/LikesPage';
import WatchLaterPage from '../Components/WatchLaterPage';
import HistoryPage from '../Components/HistoryPage';
import Playlist from '../pages/Playlist';
import PlaylistSingle from '../Components/PlaylistSingle';




function PageRoutes() {
  return (
    
  
    <Routes>
    <Route path="/" element={<Explore />} />
      	<Route path="/explore" element={<Explore />} />
        <Route path="explore/:videoId" element={<SingleVideo />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup/>} /> 

        <Route path="/likes" element={<LikesPage />} />
        <Route path="playlist/:playlistId" element={<PlaylistSingle />} />
				<Route path="/watchLater" element={<WatchLaterPage />} />
		<Route path="/history" element={<HistoryPage />} />
       		 <Route path="/playlist" element={<Playlist />} />

        
    </Routes>

   
  )
}

export default PageRoutes