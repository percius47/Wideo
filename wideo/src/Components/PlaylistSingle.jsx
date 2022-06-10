import React from 'react'
import "./PlaylistSingle.css"
import { useParams } from 'react-router-dom';
import { useUserData } from '../context/data-context';
import { PlaylistVideo } from './PlaylistVideo';
import Sidebar from './Sidebar';

function PlaylistSingle() {
    const { playlistId } = useParams();
	const {
		userData: { playlists },
	} = useUserData();

	const playlist = playlists.find(
		(currPlaylist) => currPlaylist._id === playlistId
	);

  return (
    	<div className="single-play-container">
    <Sidebar className="single-play-sidebar"/>

           
           <div className="single-play-video">
           <h2>{playlist.title}</h2>
           <div className="single-play-list">
           {playlist.videos.length === 0 ? (
						<h3>No videos added...</h3>
					) : (
						playlist.videos.map((video) => (
                        <PlaylistVideo
                        video={video}
                        playlistTitle={`${playlist.title}`}
                        playlist={playlist}
                    />
                      
                   ))
               )}
           </div>
           </div>
       </div>
  )
}

export default PlaylistSingle