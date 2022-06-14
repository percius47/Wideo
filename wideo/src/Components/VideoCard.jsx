import "./VideoCard.css";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useUserData } from "../context/data-context";
import { checkPlaylist } from "../util/checkPlaylist";
import { usePlaylist } from "../custom-hooks/usePlaylist";
import {useOnClickOutside} from "../custom-hooks/useOnClickOutside"
import { addToLikes } from "../services/likes/addLikesService";
import { deleteLikes } from "../services/likes/deleteLikes";
import { addToWatchLater } from "../services/watchlist/watchLater";
import { removeWatchLater } from "../services/watchlist/removeWatchLater";
import { addToHistory } from "../services/history/addToHistory";
import { useAuth } from "../context/auth-context";
import { getViewCount } from "../util/getViewCount";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import PlaylistModal from "./PlaylistModal";

export const VideoCard = ({ video }) => {
	const ref=useRef();
	const navigate = useNavigate();
	const {
		userData: { likesPlaylist, watchLaterPlaylist },
	} = useUserData();
	const {
		auth: { isAuthVL },
	} = useAuth();
	const [openOptions, setOpenOptions] = useState(false);
	useOnClickOutside(ref, () => setOpenOptions(false));
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

	const watchLaterHandler = () =>
		inWatchLaterPlaylist
			? removeFromWatchLaterServerCall()
			: addToWatchLaterServerCall();
          

			console.log("open",openOptions);
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
					
				

					{!openOptions && <MoreVertIcon
						onClick={() => setOpenOptions(true)}	
					/>}
						{openOptions &&<MoreVertIcon
						onClick={() => setOpenOptions(false)}	
					/>}
				</div>
                {openOptions && 
                < div className="menu-list" ref={ref}>
            <ul className="mobile-menu-list">

                <li >
                <div className='mobile-menu-list-item'
			onClick={
				isAuthVL
					? () => watchLaterHandler()
					: () => navigate("/login")
			}
				>
               {inWatchLaterPlaylist?<CheckCircleOutlineRoundedIcon/>:<AddRoundedIcon/>}
                <span >Watch Later </span>
                    </div>
                </li>
                <li >
                 <div className='mobile-menu-list-item'
					onClick={
						isAuthVL ? () => likeHandler() : () => navigate("/login")
					}
				>
        {inLikedPlaylist?<CheckCircleOutlineRoundedIcon/>:<AddRoundedIcon/>}
                <span >Liked</span>
                    </div>
                </li>
                <li  >
                   
                   {isAuthVL?( 
                    < div className='mobile-menu-list-item'
						onClick={() =>{ setOpened(true)}}
					>
                    <AddRoundedIcon/>
                        <span>
                      Playlist
                       </span>                 
                   </div>):
				   (navigate("/login"))}
                
                   </li>
				   <PlaylistModal 
				  
				   val={opened} setOpened={setOpened} video={video} />
            </ul>
         </div>
        } 
			</div>
	
	);
};
