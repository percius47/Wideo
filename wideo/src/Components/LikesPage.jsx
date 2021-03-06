import React from 'react'
import { useUserData } from '../context/data-context';
import "./LikesPage.css"
import PlaylistElement from './PlaylistElement';
import { PlaylistVideo } from './PlaylistVideo';
import Sidebar from './Sidebar';
function LikesPage() {
    const {
		userData: { likesPlaylist },
		likesLoading,
	} = useUserData();

	return  (
		<div className="likes-container"> 
		 <Sidebar className="likes-sidebar"/>

                
                <div className="likes-video">
				<h2>Liked Videos</h2> 
				<div className="likes-list">
					{likesPlaylist.length === 0 ? (
						<p>No liked Videos</p>
					) : (
		 				likesPlaylist.map((video) => (
							<PlaylistVideo video={video} playlistTitle="Likes" 
							playlist={likesPlaylist}/>
                           
						))
					)}
				</div>
                </div>
			</div>
	
	) 
}

export default LikesPage