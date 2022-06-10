import React from 'react'
import { useUserData } from '../context/data-context';
import PlaylistElement from './PlaylistElement';
import { PlaylistVideo } from './PlaylistVideo';
import Sidebar from './Sidebar'
import "./WatchLaterPage.css"
function WatchLaterPage() {
    const {
		userData: { watchLaterPlaylist },
		watchLaterLoading,
	} = useUserData();
  return (
    <div className="wl-container">
    <Sidebar className="wl-sidebar"/>

           
           <div className="wl-video">
           <h2>Saved Videos</h2>
           <div className="wl-list">
               {watchLaterPlaylist.length === 0 ? (
                   <p>No save Videos.</p>
               ) : (
                watchLaterPlaylist.map((video) => (
                       <PlaylistVideo video={video} playlistType="Watch Later"
                       playlist={watchLaterPlaylist}
                       />
                      
                   ))
               )}
           </div>
           </div>
       </div>
  )
}

export default WatchLaterPage