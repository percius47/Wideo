import "./VideoCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserData } from "../context/data-context";
import { checkPlaylist } from "../util/checkPlaylist";
import { usePlaylist } from "../custom-hooks/usePlaylist";
import { addToLikes } from "../services/likes/addLikesService";
import { deleteLikes } from "../services/likes/deleteLikes";
import { addToWatchLater } from "../services/watchlist/watchLater";
import { removeWatchLater } from "../services/watchlist/removeWatchLater";
import { addToHistory } from "../services/history/addToHistory";
import { useAuth } from "../context/auth-context";
import { getViewCount } from "../util/getViewCount";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import PlaylistModal from "./PlaylistModal";

export const VideoCard = ({ video }) => {
	const navigate = useNavigate();
	const {
		userData: { likesPlaylist, watchLaterPlaylist },
	} = useUserData();
	
	const [openOptions, setOpenOptions] = useState(false);
	const [opened, setOpened] = useState(false);
	const inLikedPlaylist = checkPlaylist(video, likesPlaylist);
	const inWatchLaterPlaylist = checkPlaylist(video, watchLaterPlaylist);
	const [addToLikesServerCall, addingToLikes] = usePlaylist(
		addToLikes,
		video,
		"SET_LIKES",
		"Added to Likes"
	);
	const [removeFromLikesServerCall, removingFromLikes] = usePlaylist(
		deleteLikes,
		video,
		"SET_LIKES",
		"Removed from Likes"
	);

	const [addToWatchLaterServerCall, addingToWatchLater] = usePlaylist(
		addToWatchLater,
		video,
		"SET_WATCHLATER",
		"Added to Watch Later"
	);
	const [removeFromWatchLaterServerCall, removingFromWatchLater] = usePlaylist(
		removeWatchLater,
		video,
		"SET_WATCHLATER",
		"Removed from Watch Later"
	);

	const [addToHistoryServerCall] = usePlaylist(
		addToHistory,
		video,
		"SET_HISTORY",
		""
	);
	const likeHandler = () =>
		inLikedPlaylist ? removeFromLikesServerCall() : addToLikesServerCall();
	const { auth,setAuth } = useAuth();
	const watchLaterHandler = () =>
		inWatchLaterPlaylist
			? removeFromWatchLaterServerCall()
			: addToWatchLaterServerCall();
          
	return (
	
<div class="card">
    <div class="card-img-wrapper"
    	onClick={async () => {
            addToHistoryServerCall();
            navigate(`/explore/${video.id}`);
        }}>

  

			
					<img src={video.thumbnail} className=" card-img" />
                    
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
					
				

					<MoreVertIcon
						onClick={() => setOpenOptions(!openOptions)}
					/>
				</div>
                {openOptions && 
                < div className="menu-list">
            <ul className="mobile-menu-list">

                <li className='mobile-menu-list-item'>
                <div	
			onClick={
				auth.isAuthVL
					? () => watchLaterHandler()
					: () => navigate("/login")
			}
				>
                <PlaylistAddRoundedIcon/>
                <span  className='mobile-menu-list-item'>
               
                 Watch Later
              
                 </span>
                    </div>
                </li>
                <li className='mobile-menu-list-item'>
                 <div 
					onClick={
						auth.isAuthVL ? () => likeHandler() : () => navigate("/login")
					}
				>
                <PlaylistAddRoundedIcon/>
                <span  className='mobile-menu-list-item'>
              
                  Liked
                 
                 </span>
                    </div>
                </li>
                <li  className='mobile-menu-list-item'>
                   
                   {/* {auth?(  */}
                    < div 
						onClick={() =>{ setOpened(true)
						
							}}
					>
                    <PlaylistAddRoundedIcon/>
                        <span
                   
                 
                    onClick={() => {
                
                    }}
                   >
                     
                    Playlist
                       </span>
                  
                   </div>
                
                   </li>
				   <PlaylistModal 
				  
				   val={opened} setOpened={setOpened} video={video} />
            </ul>
         </div>
        } 
			</div>
	
	);
};
