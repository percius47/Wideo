import React from 'react'

import {PlaylistCard} from "../Components/PlaylistCard"
import Sidebar from '../Components/Sidebar'
import { useUserData } from '../context/data-context';
import "./Playlist.css"
function Playlist() {
    const {
		userData: { playlists },
		otherPlaylistLoading,
	} = useUserData();

  return (
    <div className="play-container">
    <Sidebar className="play-sidebar"/>

           
           <div className="play-video">
           <h2>Playlists</h2>
           <div className="play-list">
               {playlists.length === 0 ? ( 
                   <p>No playlists created.</p>
               ) : (
                playlists.map((playlist) =>
                playlist.length === 0 ? (
                    <h3>No videos created...</h3>
                ) : (
                    <PlaylistCard playlist={playlist} />
               
            
                )
            )
               )}
           </div> 
           </div>
       </div>
  )
}

export default Playlist