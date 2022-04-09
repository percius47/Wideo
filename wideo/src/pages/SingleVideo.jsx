import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'

import "./SingleVideo.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useUserData } from '../context/data-context';
import { useVideoListing } from '../context/listing-context';
import { usePlaylist } from '../custom-hooks/usePlaylist';
import { addToLikes } from '../services/likes/addLikesService';
import { deleteLikes } from '../services/likes/deleteLikes';
import { removeWatchLater } from '../services/watchlist/removeWatchLater';
import { addToWatchLater } from '../services/watchlist/watchLater';
import { checkPlaylist } from '../util/checkPlaylist';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import PlaylistModal from '../Components/PlaylistModal';

function SingleVideo() {
  const {
		videoListingState: { data },
	} = useVideoListing();
	const [opened, setOpened] = useState(false);

	const { videoId } = useParams();
	const video = data?.find((video) => video.id === videoId);
	const {
		userData: { likesPlaylist, watchLaterPlaylist },
	} = useUserData();
	const {
		auth: { isAuthVL },
	} = useAuth();
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

	const likeHandler = () =>
		inLikedPlaylist ? removeFromLikesServerCall() : addToLikesServerCall();
	const watchLaterHandler = () =>
		inWatchLaterPlaylist
			? removeFromWatchLaterServerCall()
			: addToWatchLaterServerCall();
	const navigate = useNavigate();

  return (
    <div className="single-vid-container">
         <Sidebar className="single-vid-sidebar" />
   {/* Single video content */}
   <div className=" single-vid-video">
				<div className='video-frame-parent'>
                    {/* video */}
					<iframe
						width="100%"
						src={video?.src}
						title="YouTube player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						loading="lazy"
						className="video-frame"
					></iframe>

					<div className="vid-description">
						<h2>{video?.title}</h2>
						<span>
							{new Intl.NumberFormat("en-US").format(video?.views)} views • {new Date(video.uploaded).toDateString().slice(4)}
						</span>
                     
						 <div className="vid-reaction">
							<div
								className="reaction-element"
								onClick={
									isAuthVL ? () => likeHandler() : () => navigate("/login")
								}
							>
								{
										inLikedPlaylist ? <ThumbUpIcon className='reaction-icon'/> : <ThumbUpOutlinedIcon className='reaction-icon'/>
									}  
							
								<span>Like</span>
							</div>
							<div className="reaction-element">
								<LibraryAddRoundedIcon
									className="reaction-icon"
									onClick={() =>{ setOpened(true)
									console.log("save playlist");
									}}
								/>
								<span>Save</span>
							</div>
							<div
								className="reaction-element"
								onClick={
									isAuthVL
										? () => watchLaterHandler()
										: () => navigate("/login")
								}
							>
								{
										inWatchLaterPlaylist ? <BookmarkRoundedIcon/> : <BookmarkBorderRoundedIcon/>
									}  
							

								<span>Watch Later</span>
							</div>
							<PlaylistModal val={opened} setOpened={setOpened} video={video} />
						</div>
                     
						<div className="creator  ">
					
								<img
								className="creator-logo"
									src={video?.creatorProfile}
									alt="Avatar"
								/>
						
							<div className=" creator-name">
                <h2>{video?.creator}</h2></div>
						</div>
					</div> 
				</div>
                                       
			</div>
    </div>
  )
}

export default SingleVideo