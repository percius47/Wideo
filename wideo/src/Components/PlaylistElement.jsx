import React from 'react'
import "./VideoCard.css";
import { usePlaylist } from '../custom-hooks/usePlaylist';
import { removeFromHistory } from '../services/history/removeFromHistory';
import { deleteLikes } from '../services/likes/deleteLikes';
import { removeFromPlaylist } from '../services/playlist/removeFromPlaylist';
import { removeWatchLater } from '../services/watchlist/removeWatchLater';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useCustomPlaylist } from '../custom-hooks/useCustomPlaylist';
import { addToHistory } from '../services/history/addToHistory';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { getViewCount } from '../util/getViewCount';
function PlaylistElement({ video, playlistType, playlist }) {
    const [removeFromLikesServerCall] = usePlaylist(
		deleteLikes,
		video,
		"SET_LIKES",
		"Removed from Likes"
	);
	
	const [removeFromPlaylistServerCall] = useCustomPlaylist(
		removeFromPlaylist,
		playlist,
		"SET_PLAYLIST",
		`Removed from ${playlist?.title}`,
		video
	);
	const [removeFromWatchLaterServiceCall] = usePlaylist(
		removeWatchLater,
		video,
		"SET_WATCHLATER",
		"Removed from Watch Later"
	);
	const [removeFromHistoryServiceCall] = usePlaylist(
		removeFromHistory,
		video,
		"SET_HISTORY",
		"Removed from History"
	);
	
	const removeVideoHandler = () => {
		switch (playlistType) {
			case "Likes":
				removeFromLikesServerCall();
				break;
			case "Watch Later":
				removeFromWatchLaterServiceCall();
				break;
			case "History":
				removeFromHistoryServiceCall();
				break;
			default:
				removeFromPlaylistServerCall();
		}
	};
    const [addToHistoryServerCall] = usePlaylist(
		addToHistory,
		video,
		"SET_HISTORY",
		""
	);
    const {navigate}=useNavigate();
  return (
    <div class="card">
    <div class="card-img-wrapper"
    	onClick={async () => {
            addToHistoryServerCall();
			
            navigate(`/explore/${video.id}`);
        }}>

  

			
					<img src={video.thumbnail} className=" card-img" alt='No videos'/>
               
				</div>
				<div className="card-description">
		
						<div class="avatar-container">
							<img
								class="creator-avatar"
								src={video.creatorProfile}
								alt="Avatar"
							/>
						</div>
                        <div className="video-text">
							<strong class="video-title">{video.title} </strong>
							
								<div className="video-subheading">
									<span className="video-count">
										{getViewCount(video.views)} views
									</span>
									<span> • </span>
									<span className="text-xxs">
										{new Date(video.uploaded).toDateString().slice(4)}
									</span>
								

								<span className="vid-creator-name">{video.creator}</span>
                                </div>
							</div>
					
				

					<DeleteRoundedIcon
						onClick={() => removeVideoHandler()}
					/>
				</div>
               
			</div>
  )
}

export default PlaylistElement